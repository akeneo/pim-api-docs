```java [activate:Java Spring]
import java.security.SecureRandom;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.tomcat.util.buf.HexUtils;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

public class App {
    static final String OAUTH_CLIENT_ID = "CLIENT_ID";
    static final String OAUTH_SCOPES = "read_products write_products";
    
    @GetMapping("/activate")
    public void activate(HttpServletRequest request, HttpSession session, HttpServletResponse response) throws Exception {
        // Create a random state for preventing cross-site request forgery
        byte[] randomBytes = new byte[10];
        new SecureRandom().nextBytes(randomBytes);
        String state = HexUtils.toHexString(randomBytes);
    
        Object pimUrl = request.getParameter("pim_url");
        if (pimUrl == null) {
            throw new Exception("Missing PIM URL in the query");
        }
    
        // Store in the user session the state and the PIM URL
        session.setAttribute("oauth2_state", state);
        session.setAttribute("pim_url", pimUrl.toString());
    
        // Build url for the Authorization Request
        // https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.1
        String authorizeUrl = pimUrl + "/connect/apps/v1/authorize" + "?response_type=code" + "&client_id=" + OAUTH_CLIENT_ID
                + "&scope=" + OAUTH_SCOPES + "&state=" + state;
    
        // Redirect the user to the Authorization URL
        response.sendRedirect(authorizeUrl);
    }
}
```