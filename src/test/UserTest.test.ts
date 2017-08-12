import { suite, test } from "mocha-typescript";
import { IUser } from "../interfaces/user";
import { IUserModel } from "../model/user";
import { userSchema } from "../schemas/user";
import mongoose = require("mongoose");

@suite
class UserTest {
    //store test data
  private data: IUser;

  //the User model
  public static User: mongoose.Model<IUserModel>;

  public static before() {
    mongoose.Promise = global.Promise;

    //connect to mongoose and create model
    const MONGODB_CONNECTION: string = "mongodb://localhost:27017/boards";
    let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);
    UserTest.User = connection.model<IUserModel>("User", userSchema);

    //require chai and use should() assertions
    let chai = require("chai");
    chai.should();
  }

  constructor() {
    this.data = {
        email: "george+1@fieldmargin.com",
        firstName: "George",
        lastName: "Cook",
        password: "12345678",
        role: "ROLE_USER"
    };
  }

  @test("should create a new User")
  public create() {
    //create user and return promise
    return new UserTest.User(this.data).save().then(result => {
        result._id.should.exist;
        result.email.should.equal(this.data.email);
        result.firstName.should.equal(this.data.firstName);
        result.lastName.should.equal(this.data.lastName);
        result.password.should.exist;
        result.role.should.equal(this.data.role);
    });
  }

}
