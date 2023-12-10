import jwt, { JwtPayload } from "jsonwebtoken";

export namespace JwtUtils {
  export const isJwtExpired = (token: string) => {
    // offset by 60 seconds, so we will check if the token is "almost expired".
    console.log(token)
    const currentTime = Math.round(Date.now() / 1000 + 60);
    const decoded = jwt.decode(token) as JwtPayload;

    if (!decoded) {
      console.log("Nâo foi possível decodificar o token.");

      return true;
    }

    if (decoded["exp"]) {
      console.log(`Token lifetime: ${new Date(decoded["exp"] * 1000)}`);

      const adjustedExpiry = decoded["exp"];

      if (adjustedExpiry < currentTime) {
        console.log("Token expired");

        return true;
      }

      console.log("Token has not expired yet");

      return false;
    }

    console.log('Token["exp"] does not exist');
    
    return true;
  };
}

export namespace UrlUtils {
  export const makeUrl = (...endpoints: string[]) => {
    let url = endpoints.reduce((prevUrl, currentPath) => {
      if (prevUrl.length === 0) {
        return prevUrl + currentPath;
      }

      return prevUrl.endsWith("/")
        ? prevUrl + currentPath + "/"
        : prevUrl + "/" + currentPath + "/";
    }, "");
    return url;
  };
}
