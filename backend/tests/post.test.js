const postController = require("../src/controllers/post.controller");
const {Post} = require("../src/models");
const {HttpError} = require("../src/middleware/errorHandler");

jest.mock("../src/models", () => ({
    Post: {
        findByPk: jest.fn(),
    },  
}))

describe("Restricciones de estado en publicaciones", () => {
    let mockPost;
    let mockReq;
    let mockRes;

    beforeEach(()=>{

        mockPost = {
            id : 10,
            title : "Libro de Estructura de Datos",
            type : "Material Universitario",
            state : "disponible",
            userId: 1,
            update: jest.fn(),
            destroy: jest.fn(),
        };

        mockReq = {
            params: {id : 10},
            user: {id: 1},
            body: {}
        };

        mockRes = {
            json : jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        Post.findByPk().mockClear(); 
    });

    test("1. deberia permitir editar si el estado no esta reservado", async () =>{
        Post.findByPk.mockResolvedValue(mockPost);

        mockReq.body = {
            title: "Libro de ED II (Editado)",
            type: "Recurso Pal examen(E)",
            state: "disponible"
        };

        await postController.update(mockReq, mockRes);

        expect(mockPost.update).toHaveBeenCalledWith(mockReq.body);
        expect(mockRes.json).toHaveBeenCalled();
    })

})