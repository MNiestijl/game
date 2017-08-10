import java.util.HashMap;
import org.bson.types.ObjectId;

public class UserFields extends Fields {
		
	public HashMap<String, Class<?>> validFields = new HashMap<String, Class<?>>();
	public HashMap<String, Class<?>> requiredFields = new HashMap<String, Class<?>>();
	public HashMap<String, Class<?>> modifiableFields = new HashMap<String, Class<?>>();
	public HashMap<String, Class<?>> visibleFields = new HashMap<String, Class<?>>();
	
	UserFields() {
		validFields.put("_id", ObjectId.class);
		validFields.put("name", String.class);
		validFields.put("password", byte[].class);
		validFields.put("salt", byte[].class);
		validFields.put("token", String.class);
		validFields.put("tokenCreationTime", String.class);
		
		requiredFields.put("name", String.class);
		requiredFields.put("password", String.class);
		requiredFields.put("salt", String.class);
		
		modifiableFields.put("_id", ObjectId.class);
		modifiableFields.put("password", byte[].class);
		modifiableFields.put("salt", byte[].class);	
		modifiableFields.put("token", String.class);
		modifiableFields.put("tokenCreationTime", String.class);
		
		visibleFields.put("_id", ObjectId.class);
		visibleFields.put("name", String.class);
	}
}
