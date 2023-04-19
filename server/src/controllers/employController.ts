import { Request, Response } from "express";

import { sp } from "@pnp/sp-commonjs";

import { SPFetchClient } from "@pnp/nodejs-commonjs";

const getAllEmployees = async (req: Request, res: Response) => {
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
    const response = await sp.web.lists
      .getByTitle("employyy")
      .items.getById(id)();
    return res.json(response);
  } catch (error) {
    console.log(error);
  }
};
const deleteEmployee = async (req: Request, res: Response) => {
  console.log("delete employee");

  let id: number = Number.parseInt(req.params.id);
  console.log("id", id);
  try {
    let user = await sp.web.lists.getByTitle("employyy").items.getById(id);

    if (!user) {
      throw new Error("User not found");
    } else {
      await sp.web.lists.getByTitle("employyy").items.getById(id).delete();
      res.send({ message: "Deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Internal Server Error` });
  }
};
const addEmployees = async (req: Request, res: Response) => {

  try {
    
    console.log("start.");
    console.log(req.body, "req body log"); 
    console.log("hiiiiiiiiii",req.body.file);
    
    
    const newUser = {
      Id: req.body.Id,
      first_name: req.body.first_name,
      email: req.body.email,
      gender: req.body.gender,
      designation: req.body.designation,
      department:req.body.department,
      city:req.body.city,
      dob:req.body.dob
    };

    console.log("new user log", newUser);

    const response = await sp.web.lists.getByTitle("employyy").items.add({
      first_name: newUser.first_name,
      email: newUser.email,
      gender: newUser.gender,
      designation: newUser.designation,
      department: newUser.department,
      city:newUser.city,
      dob:newUser.dob
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
export { getAllEmployees, deleteEmployee, getSingleEmploy,addEmployees };
