import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRequests } from "../../services/requestsService";
import { FaArrowLeft } from "react-icons/fa";


const VerificationDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const IMAGE_URL = "http://localhost:5000";


  useEffect(() => {

    const fetchData = async () => {

      try {

        const data = await getRequests();

        const item = data.find(
          (req) => req._id === id
        );

        setRequest(item);

      } catch (error) {
        console.error(error);
      }

    };


    fetchData();

  }, [id]);



  if (!request)
    return (
      <p className="text-white text-center mt-10 text-lg">
        Loading...
      </p>
    );



  const imageStyle =
    "w-28 h-28 object-contain bg-white rounded-xl border border-slate-600 shadow-md cursor-pointer hover:scale-110 transition-all duration-300";



  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-blue-950 to-slate-900 text-white flex-row items-center justify-center">
    <div className="p-6 text-white">


      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">

        <button
          onClick={() => navigate(-1)}
          className="
          flex items-center gap-2
          px-4 py-2
          rounded-xl
          bg-white/10
          hover:bg-white/20
          transition
          "
        >
          <FaArrowLeft />
          Back
        </button>


        <h1 className="text-3xl font-bold">
          Verification Details
        </h1>

      </div>



      {/* INFORMATION CARD */}
      <div
        className="
        bg-white/5
        backdrop-blur-md
        border border-white/10
        rounded-2xl
        shadow-xl
        p-8
        space-y-5
        "
      >


        <div className="grid md:grid-cols-2 gap-6">


          <div>
            <p className="text-blue-200">
              Name
            </p>

            <p className="font-semibold text-lg">
              {request.user?.fname} {request.user?.lname}
            </p>
          </div>



          <div>
            <p className="text-blue-200">
              Email
            </p>

            <p className="font-semibold">
              {request.user?.email}
            </p>
          </div>



          <div>
            <p className="text-blue-200">
              Specialty
            </p>

            <p className="font-semibold">
              {request.specialty}
            </p>
          </div>



          <div>
            <p className="text-blue-200">
              Experience
            </p>

            <p className="font-semibold">
              {request.experience} years
            </p>
          </div>



          <div>
            <p className="text-blue-200">
              Status
            </p>

            <span
              className={`
              inline-block
              px-3 py-1
              rounded-full
              text-sm
              font-semibold
              ${
                request.status === "approved"
                ? "bg-green-500/20 text-green-400"
                :
                request.status === "rejected"
                ? "bg-red-500/20 text-red-400"
                :
                "bg-yellow-500/20 text-yellow-300"
              }
              `}
            >
              {request.status}
            </span>

          </div>


        </div>



        <div>
          <p className="text-blue-200 mb-2">
            Bio
          </p>

          <p className="
          text-slate-300
          leading-7
          bg-black/10
          p-4
          rounded-xl
          ">
            {request.bio}
          </p>

        </div>


      </div>





      {/* DOCUMENTS */}
      {/* DOCUMENTS */}
<div
  className="
  mt-8
  bg-white/5
  backdrop-blur-md
  border border-white/10
  rounded-2xl
  shadow-xl
  p-8
  "
>

  <h2 className="text-xl font-bold mb-8">
    Documents
  </h2>


  {/* ID CARD */}
  <div className="mb-8">

    <h3 className="text-blue-200 font-semibold mb-4">
      Identity Card
    </h3>


    <div className="flex flex-wrap gap-6">


      {request.documents?.idCard?.front && (

        <div className="text-center">

          <p className="text-slate-400 mb-2">
            Front ID
          </p>

          <img
            src={`${IMAGE_URL}${request.documents.idCard.front}`}
            alt="Front ID"
            className={imageStyle}
            onClick={() =>
              setSelectedImage(
                `${IMAGE_URL}${request.documents.idCard.front}`
              )
            }
          />

        </div>

      )}



      {request.documents?.idCard?.back && (

        <div className="text-center">

          <p className="text-slate-400 mb-2">
            Back ID
          </p>


          <img
            src={`${IMAGE_URL}${request.documents.idCard.back}`}
            alt="Back ID"
            className={imageStyle}
            onClick={() =>
              setSelectedImage(
                `${IMAGE_URL}${request.documents.idCard.back}`
              )
            }
          />

        </div>

      )}


    </div>

  </div>




  {/* CERTIFICATE */}
  <div className="mb-8">

    <h3 className="text-blue-200 font-semibold mb-4">
      Certificate
    </h3>


    {
    request.documents?.certificate &&

    <img
      src={`${IMAGE_URL}${request.documents.certificate}`}
      alt="Certificate"
      className={imageStyle}
      onClick={() =>
        setSelectedImage(
          `${IMAGE_URL}${request.documents.certificate}`
        )
      }
    />

    }

  </div>





  {/* OTHER DOCUMENTS */}
  <div>

    <h3 className="text-blue-200 font-semibold mb-4">
      Other Documents
    </h3>


    <div className="flex flex-wrap gap-6">

      {
      request.documents?.otherDocuments?.length > 0 ?

      request.documents.otherDocuments.map((doc,index)=>(

        <img
          key={index}
          src={`${IMAGE_URL}${doc}`}
          alt={`Document ${index+1}`}
          className={imageStyle}
          onClick={() =>
            setSelectedImage(
              `${IMAGE_URL}${doc}`
            )
          }
        />

      ))

      :

      <span className="text-gray-500">
        No documents
      </span>

      }

    </div>


  </div>


</div>





      {/* IMAGE MODAL */}
      {
      selectedImage &&

      <div
        className="
        fixed inset-0
        bg-black/80
        flex items-center justify-center
        z-50
        "
        onClick={() => setSelectedImage(null)}
      >

        <img
          src={selectedImage}
          alt="preview"
          className="
          max-w-[90%]
          max-h-[90%]
          rounded-xl
          "
          onClick={(e)=>e.stopPropagation()}
        />

      </div>

      }



    </div>
</div>
  );
};


export default VerificationDetails;