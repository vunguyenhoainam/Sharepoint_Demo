import React from "react";
import { useForm } from "react-hook-form";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";


const FormEdit = ({idItem, handleEdit, dataApp, loadData}) => {

    const data = dataApp.filter((item) => (item.ID === idItem));

    const { register, handleSubmit } = useForm();

    const sendSttEdit = () => {
      handleEdit(false)
    }
    
    const updateItem = async (data) => {
      sendSttEdit();
      await sp.web.lists.getByTitle("ListDemo").items.getById(idItem).update({
          Products: data.products,
          Description: data.description,
          Price: data.price,
          Warranty: data.warranty
          }
      );
      loadData();
    }

    return (
        <form className="form-edit" onSubmit={handleSubmit(updateItem)}>
            <p className="title">Edit Item</p>
            <p>ID</p>
            <input type="text" defaultValue={idItem} disabled />
            <p>
                Products<span>*</span>
            </p>
            <input {...register("products",{ required: true })} defaultValue={data[0].Products} name="products" type="text" spellCheck="false" placeholder="Import products..." />
            <p>
              Description<span>*</span>
            </p>
            <input {...register("description",{ required: true })} defaultValue={data[0].Description} name="description" type="text" spellCheck="false" placeholder="Import description..." />
            <p>
              Price<span>*</span>
            </p>
            <input {...register("price",{ required: true })} defaultValue={data[0].Price} name="price" type="text" spellCheck="false" placeholder="Import price..." />
            <p>
              Warranty<span>*</span>
            </p>
            <select {...register("warranty")} defaultValue={data[0].Warranty} name="warranty">
                <option value={true}>Yes</option>
                <option value={false}>No</option>
            </select>
            <div className="btn">
                <button type="submit" className="btn-update">Update</button>
                <p className="btn-cancel" onClick={sendSttEdit}>Cancel</p>
            </div>
        </form>
    );
};

export default FormEdit;