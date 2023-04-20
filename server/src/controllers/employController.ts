import { Request, Response } from "express";
import { sp } from "@pnp/sp-commonjs";

const getAllEmploys = async (req: Request, res: Response) => {
  try {
    const response = await sp.web.lists.getByTitle("employyy").items.getAll();
    return res.json(response);
  } catch (error) {
    console.log(error);
  }
};
const getSingleEmploy = async (req: Request, res: Response) => {
  let id: number = Number.parseInt(req.params.id);

  try {
    const response = await sp.web.lists.getByTitle("employyy").items.getById(id)();
    return res.json(response);
  } catch (error) {
    console.log(error);
  }
};
const deleteEmploy = async (req: Request, res: Response) => {
  console.log("delete employee");
  let id: number = Number.parseInt(req.params.id);
  console.log("id", id);
  try {
    let user = await sp.web.lists.getByTitle("employyy").items.getById(id);

    if (!user) {
      throw new Error("User not found");
    } else {
      await sp.web.lists.getByTitle("employyy").items.getById(id).delete();

      // Delete folder from library
      const folderName = `${id}`;
      const documentLibraryName = `EmployeLibrary`;
      const documentLibrary = sp.web.lists.getByTitle(documentLibraryName);
      const folder = await documentLibrary.rootFolder.folders.getByName(folderName);
      await folder.delete();

      res.send({ message: "Deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Internal Server Error` });
  }
};

const addEmploy = async (req: Request, res: Response) => {
  try {
    console.log("start.");
    console.log(req.body, "req body log");
    console.log("hi", req.body.file);

    const newUser = {
      Id: req.body.Id,
      first_name: req.body.first_name,
      email: req.body.email,
      phone: req.body.phone,
      gender: req.body.gender,
      designation: req.body.designation,
      department: req.body.department,
      city: req.body.city,
      dob: req.body.dob,
    };

    console.log("new user log", newUser);

    const response = await sp.web.lists.getByTitle("employyy").items.add({
      first_name: newUser.first_name,
      email: newUser.email,
      gender: newUser.gender,
      phone: newUser.phone,
      designation: newUser.designation,
      department: newUser.department,
      city: newUser.city,
      dob: newUser.dob,
    }); //console.log(response)

    console.log(response.data.Id);
    console.log("logging response", response);
    const folderId = response.data.Id;
    const newFolderName = `${folderId}`;
    const documentLibraryName = `EmployeLibrary`;
    const documentLibrary = sp.web.lists.getByTitle(documentLibraryName);
    await documentLibrary.rootFolder.folders
      .addUsingPath(newFolderName)
      .then(() => {
        console.log(`Folder ${newFolderName} created successfully.`);
      });

    return res.send(response);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Internal server error " });
  }
};

const updateSingleEmploy = 
  async (req: Request, res: Response) => {
    let id: number = Number.parseInt(req.params.id);

    const { first_name, email, designation,department, phone, city } = req.body;
    console.log(id, "is updated");
    try {
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: "Invalid ID provided",
        });
        return;
      } 
      const updateEmploy = {
        first_name: first_name,
        email: email,
        designation: designation,
        phone: phone,
        city: city,
        department:department
      }; 
      const employ = await sp.web.lists
        .getByTitle("employyy").items.getById(id).update(updateEmploy);
  
      res.status(200).json({
        success: true,
        message: " Succesfully Updated Employee Details",
        employ
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error " });
    }  
  }
export { getAllEmploys, deleteEmploy, getSingleEmploy, addEmploy,updateSingleEmploy };
 
