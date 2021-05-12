import React from "react";
import { useForm } from "react-hook-form";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

const FormAdd = ({loadData}) => {

    const { register, handleSubmit } = useForm();

    const addItem = async (data) => {
        await sp.web.lists.getByTitle("ListDemo").items.add({
            Products: data.products,
            Description: data.description,
            Price: data.price,
            Warranty: data.warranty
            }
        );
        loadData();
    }


    return (
        <form className="form-add" onSubmit={handleSubmit(addItem)}>
            <p className="title">Add Item</p>
            <p>
                Products<span>*</span>
            </p>
            <input {...register("products",{ required: true })} name="products" type="text" spellCheck="false" placeholder="Import products..." />
            <p>
                Description<span>*</span>
            </p>
            <input {...register("description",{ required: true })} name="description" type="text" spellCheck="false" placeholder="Import description..." />
            <p>
                Price<span>*</span>
            </p>
            <input {...register("price",{ required: true })} name="price" type="text" spellCheck="false" placeholder="Import price..." />
            <p>
                Warranty<span>*</span>
            </p>
            <select {...register("warranty")} name="warranty">
                <option value={true}>Yes</option>
                <option value={false}>No</option>
            </select>
            <button type="submit" className="btn-add">Add</button>
        </form>
    );
};

export default FormAdd;