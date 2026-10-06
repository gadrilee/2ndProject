const authController = require("../src/controllers/auth.controller");
const { User } = require("../src/models");
const bcrypt = require("bcryptjs");
const {HttpError} = require("../src/middleware/errorHandler");


jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("../src/models", () => ({
    User: {
        findOne: jest.fn()
    }
}))

jest.mock("../src/database/config", () => ({
    jwtSecret: "secret",
    jwtExpiration: "1h",
    resetTokenMinutes: 30
}));


describe("State Transitions: Password Reset", () => {
   let mockUser;
   let mockReq;
   let mockRes;

   beforeEach(() => {
        mockUser = {
            id: 1,
            name: "Gabriel Sandoval",
            email: "gabriel@example.com",
            password: "hashedPassword123",
            resetToken: null,
            resetTokenExpires: null,
            update: jest.fn().mockImplementation( async (newData) => {
                Object.assign(mockUser, newData);
            })
        };

        mockReq = {
            body: {}
        }

        mockRes = {
            json : jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        User.findOne.mockClear();
        bcrypt.hash.mockClear();
    
   });

   test("1. debe comenzar con un estado inicial, osea sin token de recuperacion", () => {
        expect(mockUser.resetToken).toBeNull();
        expect(mockUser.resetTokenExpires).toBeNull();
        expect(mockUser.name).toBe("Gabriel Sandoval");
   })

});
