const File=require("../models/File");
const cloudinary=require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
    try{
         const file=req.files.file;
         const extension=file.name.split('.')[1];

         console.log("FILE IS HERE-> ",file);
         let path = __dirname + "/files/"+Date.now()+"."`+${extension}` ;

         file.mv(path, (err) => {
            console.log(err);
         });

         res.json({
            success:'Local File Uploaded Successfully'
         });

    } catch(error){
        console.log(error);
    }
}

function isFileTypeSupported(type, supportedTypes){
    if(supportedTypes.includes(type)){
        return true;
    } 

    return false;
}

async function uploadFileTOCloudinary(file, folder, quality){
    const options ={folder};

    if(quality){
        options.quality=quality;
    }
    
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload handler
exports.imageUpload = async (req, res) => {
    try{
        const {name, tags, email} =req.body;
        console.log(name, tags, email);

        const file=req.files.imageFile;
        console.log(file);

        //Validation
        const supportedTypes = ["jpg", "jpeg", "png"];

        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File Format Not Supported"
            })
        }

        const response = await uploadFileTOCloudinary(file, "Codehelp");
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Successfully Uploaded"
        })


    } catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        });
    }
}

exports.videoUlpoad = async (req,res) => {
    try{
        const {name, tags, email} =req.body;
        console.log(name, tags, email);

        const file=req.files.videoFile;

        const supportedTypes = ["mp4", "mov"];

        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File Format Not Supported"
            })
        }

        const response = await uploadFileTOCloudinary(file, "Codehelp");
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Video Successfully Uploaded"
        })

    } catch(error){
        res.status(400).json({
            success:false,
            message:"Something Went Wrong"
        })
    }
}

exports.imageSizeReducer = async(req,res) => {
    try{
        const {name, tags, email} =req.body;
        console.log(name, tags, email);

        const file=req.files.imageFile;
        console.log(file);

        //Validation
        const supportedTypes = ["jpg", "jpeg", "png"];

        const fileType = file.name.split('.')[1].toLowerCase();



        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File Format Not Supported"
            })
        }

        const response = await uploadFileTOCloudinary(file, "Codehelp", 30);
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Successfully Uploaded"
        })
    } catch(error){
        res.status(400).json({
            success:false,
            message:"Something Went Wrong"
        });
    }
}
