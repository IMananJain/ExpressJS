import envConfig from "../../config/envConfig";
import { saltRounds } from "../../utils/commonConstants";
import { IResponse, IUser} from "./interfaces";
import userModel from "./model";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

const { secretKey } = envConfig();
const response: IResponse = {
  message: "",
  success: false,
};

class AuthService {
  static async signUp(data: Partial<IUser>): Promise<IResponse> {
    const userExists = await userModel.findOne({ email: data.email });
    if (userExists) {
      response.message = "User already exists";
      response.success = false;
      return response;
    }
    
    const hashPassword = await bcrypt.hash(data.password!,saltRounds);

    const newUser = new userModel({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashPassword,
    });

    await newUser.save();

    response.message = "User created successfully";
    response.success = true;
    return response;
  }
  
  static async logIn(data: Partial<IUser>): Promise<IResponse> {
    const userExists = await userModel.findOne({ email: data.email },{_id:0,__v:0});
    if (!userExists) {
      response.message = "Invalid User email does not exists";
      response.success = false;
      return response;
    }

    const isValidPassword = await bcrypt.compare(data.password!,userExists.password);
    if(!isValidPassword) {
      response.message = "Invalid Password";
      response.success = false;
      return response;
    }
    const { createdAt,updatedAt,password, ...userDetails } = userExists.toObject();
    const token = jwt.sign({ email: data.email }, secretKey, { expiresIn: "2000s"});

    response.message = "User Login successful";
    response.success = true;
    response.data = { userDetails,token };
    return response;
  }

  static async updateProfile(data: Partial<IUser>): Promise<IResponse> {
    const userExists = await userModel.findOne({ email: data.email },{_id:0,__v:0});
    if (!userExists) {
      response.message = "User does not exists";
      response.success = false
      return response;
    }

    await userModel.updateOne({ email: data.email }, { $set: data });
    
    const updatedDetails = await userModel.findOne({ email: data.email },{createdAt:0,password:0,_id:0,__v:0});

    response.message = "Profile updated successfully";
    response.data = { updatedDetails };
    response.success = true;
    return response;
  }

  static async deleteProfile(data: Partial<IUser>): Promise<IResponse>{
    const userExists = await userModel.findOne({ email: data.email },{_id:0,__v:0});
    if (!userExists) {
      response.message = "User does not exists";
      response.success = false
      return response;
    }
    await userModel.deleteOne({ email: data.email });
    response.message = "User deleted successfully";
    response.success = true;
    return response;
  }
}

export default AuthService;
