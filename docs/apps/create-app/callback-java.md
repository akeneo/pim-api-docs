```java [callback:Java Spring]
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;

import javax.json.Json;
import javax.json.JsonObject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.tomcat.util.buf.HexUtils;
import org.springframework.web.bind.annotation.GetMapping;

public class App {
    static final String OAUTH_CLIENT_SECRET = "CLIENT_SECRET";
    
    @GetMapping("/callback")
    public String callback(HttpServletRequest request, HttpSession session) throws Exception {
        Object sessionState = session.getAttribute("oauth2_state");
        String stateParam = request.getParameter("state");
    
        // We check if the received state is the same as in the session, for security.
        if (sessionState == null || !sessionState.equals(stateParam)) {
            throw new Exception("Invalid state");
        }
    
        Object code = request.getParameter("code");
        if (code == null) {
            throw new Exception("Missing authorization code");
        }
    
        Object pimUrl = session.getAttribute("pim_url");
        if (pimUrl == null) {
            throw new Exception("No PIM url in session");
        }
    
        // Generate code challenge
        byte[] randomBytes = new byte[30];
        new SecureRandom().nextBytes(randomBytes);
        String codeIdentifier = HexUtils.toHexString(randomBytes);
    
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] codeChallengeBytes = digest.digest((codeIdentifier + OAUTH_CLIENT_SECRET).getBytes(StandardCharsets.UTF_8));
        String codeChallenge = HexUtils.toHexString(codeChallengeBytes);
    
        String accessTokenUrl = pimUrl + "/connect/apps/v1/oauth2/token";
    
        JsonObject json = Json.createObjectBuilder()
                .add("client_id", OAUTH_CLIENT_ID)
                .add("code_identifier", codeIdentifier)
                .add("code_challenge", codeChallenge)
                .add("code", code.toString())
                .add("grant_type", "authorization_code")
                .build();
    
        // Do a POST request on the token endpoint
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest authorizeRequest = HttpRequest.newBuilder()
                .uri(URI.create(accessTokenUrl))
                .header("Content-Type", "application/json")
                .POST(BodyPublishers.ofString(json.toString()))
                .build();
    
        HttpResponse<String> response = client.send(authorizeRequest, BodyHandlers.ofString());
    
        return response.body();
    }
}
```