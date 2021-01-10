import { AuthChecker } from "type-graphql";
import jwt from "jsonwebtoken";

export interface ITokenValidResponse {
  IsValid: boolean;
  DecodedToken: JWT;
}

interface JWT {
  id: string;
  scopes: string[];
}

const authChecker: AuthChecker = async (
  { context },
  roles
): Promise<boolean> => {
  const {
    headers: { authorization }
  } = context as any;

  const token = (authorization as string).replace("Bearer", "").trim();

  const decoded: any = jwt.decode(token);

  if (decoded.scopes.includes("admin")) {
    return true;
  }

  // In doubt --> return false
  return false;
};

export default authChecker;
