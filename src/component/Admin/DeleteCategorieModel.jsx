const DeleteCategoryModal = ({
category,
onClose,
onDelete
})=>{


if(!category)
return null;


return (

<div
className="
fixed inset-0
bg-black/50
flex
items-center
justify-center
z-50
p-4
"
>


<div
className="
bg-white
rounded-2xl
p-6
max-w-sm
w-full
shadow-xl
"
>


<h2 className="text-xl font-bold">
Delete Category?
</h2>


<p className="text-gray-500 mt-2">

Are you sure you want to delete

<b>
{" "}
{category.name}
</b>

?

</p>



<div className="flex gap-3 mt-6">


<button
onClick={onClose}
className="
flex-1
bg-gray-200
py-2
rounded-xl
"
>
Cancel
</button>



<button
onClick={()=>onDelete(category._id)}
className="
flex-1
bg-red-600
text-white
py-2
rounded-xl
"
>
Delete
</button>


</div>


</div>


</div>


)

}


export default DeleteCategoryModal;