
import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import java.lang.IllegalArgumentException;

import org.bson.Document;
import org.bson.types.Binary;
import org.bson.types.ObjectId;

public class ModifyUserServlet extends HttpServlet {

	private static final long serialVersionUID = -3095679933815593459L;
	
	//57ca047ff0e52c21284e15e3

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException{
		response.setContentType("application/json");
	    response.setCharacterEncoding("UTF-8");
	    String id;
	    Document document;
	    
	    try {
	    	id = request.getPathInfo().substring(1);
	    	document = DataBase.retrieveVisibleFieldsDocument("user", new ObjectId(id), User.fields.visibleFields);
    		response.getWriter().print(document.toJson());
	    }
	    catch (NullPointerException e) {
	    	response.sendError(400, "Invalid user id");
	    	return;
	    }
	    catch (IllegalArgumentException e) {
    		response.sendError(400, "Invalid hexidecimal representation of an id.");
    	}
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException{
		String body = request.getReader().lines().reduce("", (acc, x) -> acc + x);
		Document inputDocument = Document.parse(body);
		String id;
		
		try {
	    	id = request.getPathInfo().substring(1);
	    	ObjectId objectId = new ObjectId(id);
	    	inputDocument.put("_id", objectId);
	    	Document dataBaseDocument = DataBase.retrieveDocument("user", objectId);
	    	byte[] salt = ((Binary) dataBaseDocument.get("salt")).getData();
	    	String inputPassword = inputDocument.get("password").toString();
	    	if (!inputPassword.isEmpty()) {
	    		byte[] encryptedInputPassword = Authentication.getEncryptedPassword(inputPassword, salt);
		    	inputDocument.replace("password", encryptedInputPassword);
	    	}
	    	User.modify(inputDocument);
	    }
	    catch (NullPointerException e) {
	    	response.sendError(400, "Invalid user id");
	    	return;
	    }
		catch (Exception e){
			response.sendError(400, e.getMessage());
		}
	}
}