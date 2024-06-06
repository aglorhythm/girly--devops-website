'use client'
import { useState, useContext } from "react";
import { usePathname } from "next/navigation";
import { Input, Select, SelectItem, Textarea, Button } from "@nextui-org/react";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import { FieldsMissing, DataSent } from 'components/Utils/alerts';

//Contexts
import EcommerceContext from '../../contexts/EcommerceContext';

export function RegisterForm(){
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const data = {
        firstname: firstname,
        lastname: lastname,
        email: email, 
        password: password,
    }

    const {
        dataSent,
        fieldMissing,
        buttonProcessing,
        handleCreateAccount
    } = useContext(EcommerceContext);

    return(
        <div className={`register-form mx-auto max-w-[600px] w-full m-3`}>
            <FieldsMissing data={fieldMissing} />
            <Input
                isRequired
                type="text"
                label="Prenom"
                //placeholder="Entrez votre e-mail"
                className={`my-2`}
                onChange={(event) => setFirstname(event.target.value)}
            />
            <Input
                isRequired
                type="text"
                label="Nom"
                //placeholder="Entrez votre e-mail"
                className={`my-2`}
                onChange={(event) => setLastname(event.target.value)}
            />
            <Input
                isRequired
                type="email"
                label="Email"
                //placeholder="Entrez votre e-mail"
                className={`my-2`}
                onChange={(event) => setEmail(event.target.value)}
            />
            <Input
                isRequired
                type={isVisible ? "text" : "password"}
                label="Mot de passe"
                //placeholder="definissez votre mot de passe"
                className={`my-2`}
                onChange={(event) => setPassword(event.target.value)}
                endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <IoMdEye className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <IoIosEyeOff className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                }
            
                
            />
            <div className={`flex justify-center my-5 `}>
                <Button 
                    color="primary" 
                    className={`bg-love-400`} 
                    onPress={() => handleCreateAccount(data)} 
                    isDisabled={buttonProcessing ? true : false
                }>
                    Creer mon compte
                </Button>
            </div>
        </div>
    )
}