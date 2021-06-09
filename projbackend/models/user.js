const mongoose=require("mongoose");
const crypto=require("crypto");
const uuidv1=require("uuid/v1");

var userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true,  // Trim the extra space that will come
    },
    lastname:{
        type:String,
        maxlength:32,
        trim:true
    },
    email:{type:String,
        trim:true,
        required:true,
        unique:true
    },
    userinfo:{
        type:String,
        trim:true
    },
    encry_password:{
        type:String,
        required:true
    },
    salt:String,   // This is used as secret for encrypting password
    roles:{
        type:Number, // The higher the number the more previliges you have
        default:0
    },
    purchases:{
        type:Array,
        default:[]
    }
},{timestamps:true}
);

userSchema.virtual("password")
.set(function(password){
    this._password=password;
    this.salt=uuidv1(); 
    this.encry_password=this.securePassword(password);
})
.get(function(){
    return this._password;
})
userSchema.methods={

    authenticate:function(plainpassword){
        return this.securePassword(plainpassword)===this.encry_password;
    },

    securePassword:function(plainpassword){
        if(!plainpassword) return '';
        try{
             return crypto
             .createHmac('sha256',this.salt)
             .update(plainpassword)
             .digest( 'hex');
        }
        catch(err){
            return "";
        }
    }
}


module.exports=mongoose.model("User",userSchema)