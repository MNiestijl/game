
import java.util.Map;

import org.bson.Document;
import org.bson.types.ObjectId;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class DataBase {	
	// userId currently in db: 57d48f98f0e52c17f4fd098c
	public static MongoClient client = new MongoClient(Settings.hostDB, Settings.portDB);
	public static MongoDatabase database = client.getDatabase(Settings.dataBaseName);
	
	// Retrieve a document by ID
	public static Document retrieveDocument(String collectionName, ObjectId objectId) {
		MongoCollection<Document> collection = database.getCollection(collectionName);
		return collection.find(new Document("_id", objectId)).first();
	}
	
	// Retrieve a document containing only fields visible to users.
	public static Document retrieveVisibleFieldsDocument(
			String collectionName,
			ObjectId objectId, 
			Map<String, Class<?>> visibleFields ) {
		Document result = new Document();
		Document document = retrieveDocument(collectionName, objectId);
		document.forEach((key, val) -> {
			if (visibleFields.containsKey(key)) {
				result.put(key, val);
			}
		});
		return result;
	}
	
	// Check if the document has all required fields.
	private static boolean hasRequiredFields(Document document, Map<String, Class<?>> requiredFields) {
		return requiredFields.keySet().stream().allMatch(key -> document.containsKey(key));
	}
	
	// Check if a all fields of the document are contained in possibleFields and of the proper type.
	private static boolean hasValidFields(Document document, Map<String, Class<?>> validFields) {
		for (Document.Entry<String,Object> entry : document.entrySet()) {
			 boolean isSameType = document.get(entry.getKey()).getClass().equals(validFields.get(entry.getKey()));
			 if (!validFields.containsKey(entry.getKey()) | !isSameType) {
				return false;
			}
		}
		return true;
	}
	
	// Check whether the all the fields of the document are valid and all required fields are filled
	private static boolean isValid(Document document, Map<String, Class<?>> requiredFields, Map<String, Class<?>> validFields) {
		if (hasRequiredFields(document, requiredFields) && hasValidFields(document, validFields)) {
			return true;
		}
		return false;
	}
	
	// Add new document to a collection if it is valid.
	public static void addDocument(String collectionName, Document document, Map<String, Class<?>> requiredFields, Map<String, Class<?>> validFields) throws Exception{
		MongoCollection<Document> collection = database.getCollection(collectionName);
		if (isValid(document, requiredFields, validFields)) {
			collection.insertOne(document);
		}
		else {
			throw new Exception("Document not valid.");
		}
	}
	
	// Perform modification if it is valid
	public static void modify(String collectionName, Document modifiedDocument, Map<String, Class<?>> modifiableFields) throws Exception {
		if (hasValidFields(modifiedDocument, modifiableFields)) {
			MongoCollection<Document> collection = database.getCollection(collectionName);
			collection.findOneAndUpdate(new Document("_id", modifiedDocument.getObjectId("_id")), new Document("$set", modifiedDocument));
		}
		else {
			throw new Exception("Invalid action.");
		}
	}
}
