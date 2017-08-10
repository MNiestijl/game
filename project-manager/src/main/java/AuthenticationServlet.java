import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.bson.Document;
import org.bson.types.ObjectId;

public class AuthenticationServlet extends HttpServlet {
	
	private static final long serialVersionUID = 7156132501832229376L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException{
		String body = request.getReader().lines().reduce("", (acc, x) -> acc + x);
		Document inputDocument = Document.parse(body);
		String id;
		
		try {
	    	id = request.getPathInfo().substring(1);
	    	ObjectId objectId = new ObjectId(id);
	    	inputDocument.put("_id", objectId);
	    	if (Authentication.verifyLogin(objectId, inputDocument.getString("name"), inputDocument.getString("password"))) {
	    		response.getWriter().println("succes!"); // TODO: send token.
	    		response.setStatus(200);
	    	}
	    	else{
	    		response.sendError(401, "Invalid credentials");
	    	}
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
