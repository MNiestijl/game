
import org.bson.Document;
import org.bson.types.ObjectId;

public class User {

	public static UserFields fields = new UserFields();	
	
	public static Document retrieveDocument(ObjectId objectId) {
		return DataBase.retrieveDocument("user", objectId);
	}
	
	public static void modify(Document modifiedDocument) throws Exception {
		DataBase.modify("user", modifiedDocument, fields.modifiableFields);
	}
	
	public static void newUser(Document document) throws Exception {
		DataBase.addDocument("user", document, fields.requiredFields, fields.validFields);
	}

}
