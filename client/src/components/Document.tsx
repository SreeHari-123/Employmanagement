// import React, { useRef as importedUseRef, useState } from "react";
// import NavBar from "./NavBar";
// import SearchBar from "./SearchBar";
// import Footer from "./Footer";
// import { Grid, Typography, IconButton, makeStyles, Tab, Tabs } from "@material-ui/core";
// import CloudUploadIcon from "@material-ui/icons/CloudUpload";
// import DeleteIcon from "@material-ui/icons/Delete";
// import { useNavigate,useParams } from "react-router-dom";
// import TaB from "./TaB";


// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   iconButton: {
//     marginRight: theme.spacing(1),
//   },
//   icon: {
//     fontSize: 50,
//   },
//   fileName: {
//     margin: "0 10px",
//   },
//   deleteButton: {
//     marginLeft: theme.spacing(1),
//   },
// }));

// const Document: React.FC = () => {
//   const { id } = useParams();
//   const fileInputRef = importedUseRef<HTMLInputElement>(null);
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
//   const classes = useStyles();

//   const handleFileInputChange = () => {
//     const file = fileInputRef.current?.files?.[0];
//     if (file) {
//       setSelectedFiles([...selectedFiles, file]);
//       console.log(`Selected file: ${file.name}`);
//     }
//   };

//   const handleFileDelete = (index: number) => {
//     const newSelectedFiles = [...selectedFiles];
//     newSelectedFiles.splice(index, 1);
//     setSelectedFiles(newSelectedFiles);
//   };
//   const navigate= useNavigate();


//   return (
//     <>
//       <NavBar />
//       <TaB/>
//       <SearchBar />
//       <div className={classes.root}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <input
//               type="file"
//               accept=".doc,.docx,.pdf"
//               ref={fileInputRef}
//               onChange={handleFileInputChange}
//               hidden
//             />
//             <IconButton
//               style={{ backgroundColor: "blue", color: "white" }}
//               className={classes.iconButton}
//               onClick={() => fileInputRef.current?.click()}
//             >
//               <CloudUploadIcon className={classes.icon} />
//               <Typography>
//                 <h4>DOCUMENTS</h4>
//               </Typography>
//             </IconButton>
//             {selectedFiles.map((file, index) => (
//               <div key={file.name}>
//                 <Typography variant="subtitle1" className={classes.fileName}>
//                   <h4> {file.name}</h4>
//                 </Typography>
//                 <IconButton
//                   style={{ backgroundColor: "red", color: "white" }}
//                   className={classes.deleteButton}
//                   onClick={() => handleFileDelete(index)}
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               </div>
//             ))}
//           </Grid>
//         </Grid>
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default Document;
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TaB from "./TaB";
import { Navbar } from "react-bootstrap";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Card, CardContent, CardMedia } from "@material-ui/core";

interface Document {
  id: any;
  Name: string;
  url: string;
  odata:string;
  "odata.id":string;
  ServerRelativeUrl:string;
}
let odata : any
const Document: React.FC = () => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [files, setFiles] = React.useState<Document[]>([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUploadClick = async () => {
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.put(
        `http://localhost:5000/document/${id}`,
        formData
      );

     console.log(response.data)
      setSelectedFile(null);
      // window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

   
  const fetchData = React.useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/files/${id}`
      );
      const files = response.data.files;
      console.log(response.data.files);
      console.log(typeof files);
      setFiles(files);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
      <div >
        <NavBar/>
        <TaB/>
        {/* upload section */}
        <div >
          <h2 >Upload File</h2>
          <input type="file" onChange={handleFileSelect} className="mb-2" />
          <button
            type="button"
            onClick={handleUploadClick}
          >
            Upload
          </button>
        </div>

        {/* file  */}
        <div >
          <h2 >File List</h2>
          <ul>
            {files.map((file) => (
              <li
                key={file?.Name}
              >   
              
               <span >{file?.Name}</span>
              
                              <img src="https://2mxff3.sharepoint.com/sites/sreehari/EmployeLibrary/39/DL.PDF"/>
               <Card>
                  <CardContent>
                    <CardMedia
                    image="https://2mxff3.sharepoint.com/sites/sreehari/EmployeLibrary/39/profilepic.png"
                  />

                  </CardContent>
               </Card>

                <button
                  onClick={() => window.open(file["odata.id"], "_blank")}
                >
                </button>
              </li>
            ))}
          </ul>
        </div>
        <Footer/>
      </div>
  );
};

export default Document;