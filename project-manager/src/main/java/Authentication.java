import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Arrays;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.bson.types.Binary;

public class Authentication {
	
	public static byte[] getEncryptedPassword(String password, byte[] salt) 
			throws NoSuchAlgorithmException, InvalidKeySpecException {
	    KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, Settings.encryptionIterations, Settings.encryptionLength);
	    SecretKeyFactory f = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
	    return f.generateSecret(spec).getEncoded();
	}
	
	public static boolean verifyLogin(ObjectId id, String name, String password) 
			throws NoSuchAlgorithmException, InvalidKeySpecException {
		Document user = DataBase.retrieveDocument("user", id);
		byte[] salt = ((Binary) user.get("salt")).getData();
		byte[] encryptedDataBasePassword = ((Binary) user.get("password")).getData();
		byte[] encryptedInputPassword = getEncryptedPassword(password, salt);
		return Arrays.equals(encryptedDataBasePassword, encryptedInputPassword) && user.get("name").toString().equals(name);
	}
	
	public static byte[] getNewSalt() {
		// TODO: return random Settings.saltLength long string.
		return "abcddefashjkadsa".getBytes();
	}

}
