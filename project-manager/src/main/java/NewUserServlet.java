import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;

import org.bson.Document;

public class NewUserServlet extends HttpServlet {

	private static final long serialVersionUID = -3095679933815593459L;
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException{
		String body = request.getReader().lines().reduce("", (acc, x) -> acc + x);
		Document inputDocument = Document.parse(body);
		byte[] salt = Authentication.getNewSalt();
		inputDocument.put("salt", salt);
		
		try {
			String password = inputDocument.get("password").toString();
			inputDocument.replace("password", Authentication.getEncryptedPassword(password, salt));
	    	User.newUser(inputDocument);
	    }
		catch (Exception e){
			response.sendError(400, e.getMessage());
		}
	}
}