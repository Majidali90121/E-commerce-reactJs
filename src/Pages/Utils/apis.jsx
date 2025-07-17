export async function fetchProduct(){
    try{
        const response =await fetch(`https://fakestoreapi.com/products`)
        const data= await response.json()
        return data
    }catch(error){
        console.error("Error in fetching Products:",error);
        return [];
    }
}

export async function fetchProductDetails(id){
    try{
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        const data = await response.json()
        return data
    }catch(error){
        console.error("Error in fetching Product details:",error)
        return null;
    }
}

export const processPayment =async (PaymentData) =>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({success:true, transictionId: Math.random().toString(36).substring(7)})
        }, 1000)
    })
}