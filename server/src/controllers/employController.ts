import { Request, Response } from "express";
import { sp } from "@pnp/sp-commonjs";
import getContentType from "../getContentType";

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
    const response = await sp.web.lists
      .getByTitle("employyy")
      .items.getById(id)();
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
      const folder = await documentLibrary.rootFolder.folders.getByName(
        folderName
      );
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

const updateSingleEmploy = async (req: Request, res: Response) => {
  let id: number = Number.parseInt(req.params.id);

  const {
    first_name,
    email,
    designation,
    department,
    phone,
    city,
    dob,
    gender,
  } = req.body;
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
      department: department,
      dob: dob,
      gender: gender,
    };
    const employ = await sp.web.lists
      .getByTitle("employyy")
      .items.getById(id)
      .update(updateEmploy);

    res.status(200).json({
      success: true,
      message: " Succesfully Updated Employee Details",
      employ,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error " });
  }
};

const uploadImage = async (req: Request, res: Response) => {
  let image = (req?.files as any)?.image;

  console.log("imagetype", image);

  let id: number = Number.parseInt(req.params.id);

  if (!image) {
    console.error("No file selected");
    console.log(req.files);
    return res.status(400).json({
      success: false,
      message: "No file selected",
    });
  }

  const documentLibraryName = `EmployeLibrary/${id}`;
  const fileNamePath = `profilepic.png`;

  let result: any;
  if (image?.size <= 10485760) {
    // small upload
    console.log("Starting small file upload");
    result = await sp.web
      .getFolderByServerRelativePath(documentLibraryName)
      .files.addUsingPath(fileNamePath, image.data, { Overwrite: true });
  } else {
    // large upload
    console.log("Starting large file upload");
    result = await sp.web
      .getFolderByServerRelativePath(documentLibraryName)
      .files.addChunked(
        fileNamePath,
        image,
        () => {
          console.log(`Upload progress: `);
        },
        true
      );
  }

  console.log("Server relative URL:", result?.data?.ServerRelativeUrl);
  const url = `https://2mxff3.sharepoint.com${result?.data?.ServerRelativeUrl}`;

  const list = sp.web.lists.getByTitle("employyy");

  try {
    await list.items.getById(id).update({
      image: url,
    });

    console.log("File upload successful");
    res.status(200).json({
      success: true,
      message: "Profile picture uploaded successfully",
    });
  } catch (error) {
    console.error("Error while updating employee item:", error);
    res.status(500).json({
      success: false,
      message: "Error while updating employee item",
    });
  }
};
//upload document to userfolder by id
const uploadDocument = async (req: Request, res: Response) => {
  let file = (req?.files as any)?.file;
  let id: number = Number.parseInt(req.params.id);
  console.log("imagetype", file);

  if (!file) {
    console.error("No file selected");
    return res.status(400).json({
      success: false,
      message: "No file selected",
    });
  }

  const documentLibraryName = `EmployeLibrary/${id}`;
  const fileNamePath = file.name;

  let result: any;
  if (file?.size <= 10485760) {
    // small upload
    console.log("Starting small file upload");
    result = await sp.web
      .getFolderByServerRelativePath(documentLibraryName)
      .files.addUsingPath(fileNamePath, file.data, { Overwrite: true });
  } else {
    // large upload
    console.log("Starting large file upload");
    result = await sp.web
      .getFolderByServerRelativePath(documentLibraryName)
      .files.addChunked(
        fileNamePath,
        file,
        () => {
          console.log(`Upload progress: `);
        },
        true
      );
  }

  res.status(200).json({
    success: true,
    message: "Document Uploaded succesfullly",
  });
};
// Get all files in a directory
const getFilesInDirectory = async (req: Request, res: Response) => {
  let id: number = Number.parseInt(req.params.id);
  console.log("files listn");
  const documentLibraryName = `EmployeLibrary/${id}`;

  try {
    const folder = await sp.web
    
      .getFolderByServerRelativePath(documentLibraryName)
      .files.get();
    console.log("Folder : ",folder);
    console.log(documentLibraryName);

    const files = folder.map((file: any) => {
      return file;
    });

    res.status(200).json({
      success: true,
      message: "Retrieved files in directory",
      files,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error retrieving files in directory",
    });
  }
};
//download files
const downloadFile = async (req: Request, res: Response) => {
  const serverRelativePath = req.query.serverRelativePath as string;
  const file = sp.web.getFileByServerRelativePath(serverRelativePath);
  const buffer: ArrayBuffer = await file.getBuffer();
  
  const fileName = serverRelativePath.split('/').pop() || ''; // get the file name with extension
  const contentType = getContentType(fileName); // get the content type based on file extension

  res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
  res.setHeader('Content-type', contentType);
  res.status(200).send(Buffer.from(buffer));
};
export {
  getAllEmploys,
  deleteEmploy,
  getSingleEmploy,
  addEmploy,
  updateSingleEmploy,
  uploadImage,
  uploadDocument,
  getFilesInDirectory,
  downloadFile
};
