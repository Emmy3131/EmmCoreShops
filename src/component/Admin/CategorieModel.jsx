const CategoryModal = ({category,onClose})=>{

if(!category)
return null;


return (

<div
className="
fixed inset-0
bg-black/50
backdrop-blur-sm
flex
items-center
justify-center
p-4
z-50
"
>


<div
className="
bg-white
rounded-3xl
shadow-2xl
max-w-lg
w-full
overflow-hidden
"
>


<img
src={category.image}
className="
w-full
h-56
object-cover
"
/>


<div className="p-6">


<div className="flex justify-between">


<h2 className="text-2xl font-bold">

{category.name}

</h2>


<button
onClick={onClose}
className="text-xl"
>
✕
</button>


</div>



<p className="text-gray-500 mt-3">

{category.description}

</p>



<div className="grid grid-cols-2 gap-4 mt-6">


<div className="bg-gray-100 p-4 rounded-xl">

<p className="text-sm text-gray-500">
Products
</p>

<h3 className="text-2xl font-bold">

{
category.products?.length || 0
}

</h3>

</div>



<div className="bg-gray-100 p-4 rounded-xl">

<p className="text-sm text-gray-500">
Status
</p>

<h3 className="font-bold">

{
category.status || "Active"
}

</h3>

</div>


</div>



</div>


</div>


</div>

)

}


export default CategoryModal;