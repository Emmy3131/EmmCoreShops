import {
  FaStore,
  FaUsers,
  FaMoneyBillWave,
  FaTruck,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import {toast} from "react-toastify"

const SellOnEmmCoreShopes = () => {
  const handleSeller = ()=>{
    toast.success("Coming Soon")
  }
  return (
    <div className="bg-slate-50 min-h-screen pb-24">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 text-white px-6 py-14 text-center">

        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative z-10">

          <div className="w-20 h-20 mx-auto rounded-full bg-white/20 backdrop-blur flex items-center justify-center mb-5">
            <FaStore size={38} />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold">
            Sell on EmmCore Shops
          </h1>

          <p className="mt-4 text-sm md:text-base max-w-xl mx-auto text-blue-50">
            Join thousands of sellers reaching customers across Nigeria.
            Grow your business with powerful tools and secure payments.
          </p>


          <button
            className="
              mt-8
              bg-white
              text-blue-700
              px-8
              py-3
              rounded-xl
              font-semibold
              shadow-lg
              hover:bg-blue-50
              transition
              flex
              items-center
              gap-2
              mx-auto
            "
          >
            Start Selling
            <FaArrowRight />
          </button>

        </div>

      </section>


      {/* WHY SELL */}
      <section className="px-6 py-10">

        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">
          Why Sell With EmmCore?
        </h2>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">


          {/* CARD */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition">

            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
              <FaUsers size={24}/>
            </div>

            <h3 className="font-bold text-slate-800">
              Massive Customer Reach
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Connect with thousands of active buyers searching for products.
            </p>

          </div>



          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition">

            <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center mb-4">
              <FaMoneyBillWave size={24}/>
            </div>

            <h3 className="font-bold text-slate-800">
              Secure Payments
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Receive payments safely through our trusted payment system.
            </p>

          </div>



          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition">

            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
              <FaTruck size={24}/>
            </div>

            <h3 className="font-bold text-slate-800">
              Nationwide Delivery
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Deliver products faster with reliable logistics support.
            </p>

          </div>


        </div>

      </section>



      {/* HOW IT WORKS */}
      <section className="bg-white px-6 py-10">


        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">
          How It Works
        </h2>


        <div className="space-y-5">


          {[
            "Create your seller account",
            "Upload your products",
            "Receive customer orders",
            "Deliver products and get paid",
          ].map((item,index)=>(
            <div
              key={index}
              className="
              flex
              items-center
              gap-4
              bg-slate-50
              p-4
              rounded-xl
              "
            >

              <div className="
                w-8
                h-8
                rounded-full
                bg-blue-600
                text-white
                flex
                items-center
                justify-center
              ">
                <FaCheckCircle size={16}/>
              </div>


              <p className="font-medium text-slate-700">
                {item}
              </p>

            </div>
          ))}


        </div>

      </section>



      {/* CTA */}
      <section className="px-6 py-12 text-center">

        <div className="
          max-w-xl
          mx-auto
          bg-gradient-to-r
          from-blue-600
          to-cyan-500
          rounded-3xl
          p-8
          text-white
          shadow-xl
        ">

          <h2 className="text-2xl font-bold">
            Ready to grow your business?
          </h2>


          <p className="mt-3 text-blue-100">
            Become a seller today and start reaching more customers.
          </p>


          <button onClick={handleSeller}
            className="
            mt-6
            bg-white
            text-blue-700
            px-10
            py-3
            rounded-xl
            font-bold
            hover:bg-blue-50
            transition
            "
          >
            Register Now
          </button>


        </div>

      </section>


    </div>
  );
};

export default SellOnEmmCoreShopes;