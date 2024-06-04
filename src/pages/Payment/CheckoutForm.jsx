import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ classes }) => {

    const { _id, price, title, category, photo, teacher_email, teacher_name } = classes;

    const axiosSecure = useAxiosSecure()
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price })
            .then(res => {
                console.log(res.data.clientSecret)
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure, price])

    const { mutateAsync } = useMutation({
        mutationFn: async classData => {
            const {data} = await axiosSecure.post('/enroll-class', classData)
            return data
        },
        onSuccess: () => {
            toast.success('Successfully enroll this class')
            navigate('/dashboard/my-enroll-class')
        }
    })

    const handlePayment = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('payment error', error)
            toast.error(error.message)
        }
        else {
            console.log('payment method', paymentMethod)
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName

                }
            }
        })

        if(confirmError){
            console.log(confirmError)
        }
        else{
            console.log(paymentIntent)
            if(paymentIntent.status === 'succeeded'){

                const paymentClass = {
                    name: user?.displayName,
                    email: user?.email,
                    userPhoto: user?.photoURL,
                    classId: _id,
                    price,
                    title,
                    category,
                    photo,
                    teacher_email,
                    teacher_name,
                    transactionId: paymentIntent?.id
                }

                await mutateAsync(paymentClass)
            }
        }

    }

    return (
        <form onSubmit={handlePayment} className="my-5">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div className="flex justify-end mt-5">
                <button type="submit" disabled={!stripe || !clientSecret} className="btn btn-secondary font-bold">
                    Pay
                </button>
            </div>
        </form>

    );
};

export default CheckoutForm;