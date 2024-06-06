
'use client';
import React, { useEffect, useState, useContext } from "react";

//Styles
import {
    
    Button,
    Spinner,
} from "@nextui-org/react";

//Contexts
import EcommerceContext from '/contexts/EcommerceContext';


/**
* Given a dollar amount, return the amount in cents
* @param {number} number 
*/
export const fromDecimalToInt = (number) => parseInt(number * 100)

/**
 * 
 * Given a cent amount, return the amount in dollar
 */
export const fromIntToDecimal = (number) => (number) / 100

export const addToCart = () => {

}

export function AddToCartButton({ item }) {
    const {
        handleAddItem,
        buttonProcessing
    } = useContext(EcommerceContext);
    console.log('item:', item)

    return (
        <div>
            <Button
                radius="full"
                className="bg-gradient-to-tr from-pink-500 to-love-400 text-white shadow-lg"
                onPress={() => handleAddItem(item)}
            >
                {`Ajouter au panier`}
            </Button>
            {buttonProcessing && (
                <div className="flex text-zinc-50 text-sm justify-center items-center">
                    <Spinner
                        color="danger"
                        labelClassName="text-zinc-50"
                        classNames={{
                            label: "text-small",
                        }}
                    />
                </div>
            )}
        </div>
    )
}