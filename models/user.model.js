import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import { isPasswordStrong } from '../utils/validations.utils.js'

const UserModel = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 20,
            trim: true,
            validate: {
                validator: (val) => validator.isAlphanumeric(val, ['fr-FR'], { ignore: " -" }),
                message: 'Votre pseudo ne peut contenir que des lettres, chiffres, tirets (-) et underscores (_) et faire entre 3 et 20 caractères.'
            }
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 1024,
            trim: true,
            validate: {
                validator: (val) => isPasswordStrong(val),
                message: "Votre mot de passe ne respecte pas les conditions requises."
            }
        },

        picture: {
            type: String,
            default: "/avatars/avatar-1.png"
        },

        tasks: {
            type: [String]
        },
    },
    {
        timestamps: true,
    },
    {
        minimize: false
    }
);

UserModel.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserModel.statics.login = async function (pseudo, password) {
    const user = await this.findOne({ pseudo });
    if (user) {
        const isSamePassword = await bcrypt.compare(password, user.password);
        if (isSamePassword) {
            return user;
        } else {
            throw {
                name: 'password',
                message: 'Mot de passe incorrect.'
            };
        }
    } else {
        throw {
            name: 'pseudo',
            message: 'Ce pseudo n\'est rattachée à aucun compte.'
        }
    }

};


export default mongoose.model("user", UserModel)