import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const Payment = () => {

    const { id } = useParams()
    const axiosSecure = useAxiosSecure()

    const { data: classes = {}, isLoading } = useQuery({
        queryKey: ['classes', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/classes/${id}`)
            return data
        },
    })
    console.log(classes)

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div className="min-h-[calc(100vh-184px)] max-w-5xl mx-auto pb-10 pt-24">
            <div className="card w-full md:w-1/2 mx-auto bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{classes?.title}</h2>
                    <p className="font-medium">Category: {classes?.category}</p>
                    <p className="font-semibold">Price: ${classes?.price}</p>
                    <div>
                        <Elements stripe={stripePromise}>
                           <CheckoutForm classes={classes}></CheckoutForm>
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;