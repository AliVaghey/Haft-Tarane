import { useEffect, useState } from "react";
import ToastError from "./toast/toast-error";
import { toast } from "sonner";
import { axios } from "@/lib/axios";
import { Plus, Trash, Trash2 } from "lucide-react";
import LoadingChita from "./loading-chita";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/yellow.css";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useRouter } from "next/navigation";

const FlightReservationForm = ({ params }) => {
  const [uniqueID, setUniqueID] = useState("");
  const [sessionID, setSessionID] = useState("SESSION_ID");
  const [captchaData, setCaptchaData] = useState(null);
  const [captchaCode, setCaptchaCode] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [passengers, setPassengers] = useState([
    {
        "type": "ADL",
        "firstname_fa": "",
        "lastname_fa": "",
        "firstname_en": "",
        "lastname_en": "",
        "gender": "male",
        "nationality": "ir",
        "passenger_code": "",
        "expdate": "",
        "birthday": "",
        "nationality_code": "IRI"
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = params;
  const router = useRouter();

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  let flightData = getCookie("flightData");
  let flightDataConverter = JSON.parse(flightData);
  useEffect(() => {
    fetchCaptcha();
  }, []);

  const fetchCaptcha = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/user/plane/captcha`, {
        uniqueID: id,
      });
      setCaptchaData(response.data);
    } catch (error) {
      toast.error(
        <ToastError
          text={error?.response?.data?.message || "An internal error occurred."}
        />,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPassenger = () => {
    setPassengers([
      ...passengers,
      {
        "type": "ADL",
        "firstname_fa": "",
        "lastname_fa": "",
        "firstname_en": "",
        "lastname_en": "",
        "gender": "male",
        "nationality": "ir",
        "passenger_code": "",
        "expdate": "",
        "birthday": "",
        "nationality_code": "IRI"
    },
    ]);
  };

  const handleRemovePassenger = (index) => {
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
  };

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  const validateAge = (birthday, type) => {
    const age = Math.floor(
      (new Date() - new Date(birthday)) / (1000 * 60 * 60 * 24 * 365.25),
    );
    if (type === "ADL" && age < 12) return false;
    if (type === "CHD" && (age < 2 || age >= 12)) return false;
    if (type === "INF" && age >= 2) return false;
    return true;
  };

  const handleReservation = async () => {
    const isValid = passengers.every((p) => validateAge(p.birthday, p.type));
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/user/plane/reserve`, {
        uniqueID: id,
        requestID: captchaData?.requestID,
        captchaCode,
        mobile,
        email,
        passengers: JSON.stringify(passengers),
        flight_info: flightData,
      });
      router.push(`${response.data.paymentUrl}?url=${process.env.NEXT_PUBLIC_FRONTEND_URL}/fa/user/ticket`);

    } catch (error) {
      toast.error(
        <ToastError
          text={error?.response?.data?.message || "An internal error occurred."}
        />,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <div className="flex min-h-screen items-center justify-center bg-yellow-100 p-6">
      <LoadingChita />
    </div>
  ) : (
    <div className="min-h-screen bg-yellow-100 p-6">
      <h1 className="mb-4 text-center text-3xl font-bold text-yellow-800">
        رزرو پرواز
      </h1>
      {captchaData && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-yellow-800">اطلاعات مسافر</h2>
          {passengers.map((passenger, index) => (
            <div
              key={index}
              className="space-y-4 rounded-lg border border-yellow-400 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-yellow-700">
                  مسافر {index + 1}
                </span>
                <button
                  onClick={() => handleRemovePassenger(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex w-full items-center justify-start gap-4">
                  <label
                    htmlFor={`nationality-${index}`}
                    className="block w-[15%] font-bold text-gray-700"
                  >
                    ملیت:
                  </label>
                  <select
                    id={`nationality-${index}`}
                    className="w-1/2 rounded-lg border p-3"
                    value={passenger.nationality}
                    onChange={(e) =>
                      handlePassengerChange(
                        index,
                        "nationality",
                        e.target.value,
                      )
                    }
                  >
                    <option value="ir">ایرانی</option>
                    <option value="fo">خارجی</option>
                  </select>
                </div>
                <div className="flex w-full items-center justify-start gap-4">
                  <label
                    htmlFor={`type-${index}`}
                    className="block w-[15%] font-bold text-gray-700"
                  >
                    نوع مسافر:
                  </label>
                  <select
                    id={`type-${index}`}
                    className="w-1/2 rounded-lg border p-3 "
                    value={passenger.type}
                    onChange={(e) =>
                      handlePassengerChange(index, "type", e.target.value)
                    }
                  >
                    <option value="ADL">بزرگسال</option>
                    {flightDataConverter.price_final_chd > 0 ? (
                      <option value="CHD">کودک</option>
                    ) : null}
                    {flightDataConverter.price_final_inf > 0 ? (
                      <option value="INF">نوزاد</option>
                    ) : null}
                  </select>
                </div>
                <div className="flex w-full items-center justify-start gap-4">
                  <label
                    htmlFor={`gender-${index}`}
                    className="block w-[15%] font-bold text-gray-700"
                  >
                    جنسیت:
                  </label>
                  <select
                    id={`gender-${index}`}
                    className="w-1/2 rounded-lg border p-3 "
                    value={passenger.gender}
                    onChange={(e) =>
                      handlePassengerChange(index, "gender", e.target.value)
                    }
                  >
                    <option value="male">آقا</option>
                    <option value="female">خانم</option>
                  </select>
                </div>
                <div className="flex w-full items-center justify-start gap-4">
                  <label
                    htmlFor={`firstname_en-${index}`}
                    className="block w-[15%] font-bold text-gray-700"
                  >
                    نام (EN):
                  </label>
                  <input
                    id={`firstname_en-${index}`}
                    type="text"
                    className="w-1/2 rounded-lg border p-3"
                    value={passenger.firstname_en}
                    onChange={(e) =>
                      handlePassengerChange(
                        index,
                        "firstname_en",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="flex w-full items-center justify-start gap-4">
                  <label
                    htmlFor={`lastname_en-${index}`}
                    className="block w-[15%] font-bold text-gray-700"
                  >
                    نام خانوادگی (EN):
                  </label>
                  <input
                    id={`lastname_en-${index}`}
                    type="text"
                    className="w-1/2 rounded-lg border p-3"
                    value={passenger.lastname_en}
                    onChange={(e) =>
                      handlePassengerChange(
                        index,
                        "lastname_en",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="flex w-full items-center justify-start gap-4">
                  <label
                    htmlFor={`firstname_fa-${index}`}
                    className="block w-[15%] font-bold text-gray-700"
                  >
                    نام (FA):
                  </label>
                  <input
                    id={`firstname_fa-${index}`}
                    type="text"
                    className="w-1/2 rounded-lg border p-3"
                    value={passenger.firstname_fa}
                    onChange={(e) =>
                      handlePassengerChange(
                        index,
                        "firstname_fa",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="flex w-full items-center justify-start gap-4">
                  <label
                    htmlFor={`lastname_fa-${index}`}
                    className="block w-[15%] font-bold text-gray-700"
                  >
                    نام خانوادگی (FA):
                  </label>
                  <input
                    id={`lastname_fa-${index}`}
                    type="text"
                    className="w-1/2 rounded-lg border p-3"
                    value={passenger.lastname_fa}
                    onChange={(e) =>
                      handlePassengerChange(
                        index,
                        "lastname_fa",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="flex w-full items-center justify-start gap-4">
                  <label
                    htmlFor={`birthday-${index}`}
                    className="block w-[15%] font-bold text-gray-700"
                  >
                    تاریخ تولد:
                  </label>
                  <DatePicker
                    className="yellow"
                    onChange={(date) => {
                      date?.isValid
                        ? handlePassengerChange(
                            index,
                            "birthday",
                            new Date(date).toISOString().split("T")[0],
                          )
                        : "";
                    }}
                    format={false ? "MM/DD/YYYY" : "YYYY/MM/DD"}
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    style={{
                      width: "100%",
                      paddingTop: "19px",
                      paddingBottom: "19px",
                      borderColor: "rgb(226 232 240)",
                    }}
                  />
                </div>
                <div className="flex w-full items-center justify-start gap-4">
                  <label
                    htmlFor={`passenger_code-${index}`}
                    className="block w-[15%] font-bold text-gray-700"
                  >
                    کد ملی / کد پاسپورت:
                  </label>
                  <input
                    id={`passenger_code-${index}`}
                    type="text"
                    className="w-1/2 rounded-lg border p-3"
                    value={passenger.passenger_code}
                    onChange={(e) =>
                      handlePassengerChange(
                        index,
                        "passenger_code",
                        e.target.value,
                      )
                    }
                  />
                </div>
                {passenger.nationality === "fo" && (
                  <div className="flex w-full items-center justify-start gap-4">
                    <label
                      htmlFor={`expdate-${index}`}
                      className="block w-[15%] font-bold text-gray-700"
                    >
                      تاریخ انقضای پاسپورت:
                    </label>
                    <DatePicker
                      className="yellow"
                      onChange={(date) => {
                        date?.isValid
                          ? handlePassengerChange(
                              index,
                              "expdate",
                              new Date(date).toISOString().split("T")[0],
                            )
                          : "";
                      }}
                      format="YYYY/MM/DD"
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      style={{
                        width: "100%",
                        paddingTop: "19px",
                        paddingBottom: "19px",
                        borderColor: "rgb(226 232 240)",
                      }}
                    />
                  </div>
                )}

                {/* Nationality Code (Visible only for "خارجی") */}
                {passenger.nationality === "fo" && (
                  <div className="flex w-full items-center justify-start gap-4">
                    <label
                      htmlFor={`nationality_code-${index}`}
                      className="block w-[15%] font-bold text-gray-700"
                    >
                      کد کشور:
                    </label>
                    <input
                      id={`nationality_code-${index}`}
                      type="text"
                      className="w-1/2 rounded-lg border p-3"
                      value={passenger.nationality_code}
                      onChange={(e) =>
                        handlePassengerChange(
                          index,
                          "nationality_code",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          <button
            className="flex w-full items-center justify-center rounded-lg bg-yellow-500 py-3 font-bold text-white hover:bg-yellow-600"
            onClick={handleAddPassenger}
          >
            <Plus />
          </button>
        </div>
      )}
      {/* Contact Info and Submit */}
      {captchaData && passengers.length > 0 && (
        <div className="mx-auto mt-6 max-w-md space-y-4">
          <label
            htmlFor={"phone"}
            className="block w-[15%] font-bold text-gray-700"
          >
            موبایل :{" "}
          </label>
          <input
            id="phone"
            type="text"
            className="w-full rounded-lg border p-3 "
            placeholder="شماره موبایل"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <label
            htmlFor={`email`}
            className="block w-[15%] font-bold text-gray-700"
          >
            ایمیل :{" "}
          </label>
          <input
            type="email"
            id="email"
            className="w-full rounded-lg border p-3 "
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="mx-auto mt-10 max-w-md space-y-4">
            <img
              src={captchaData?.captchaLink}
              alt="CAPTCHA"
              className="w-full rounded-lg border border-yellow-500"
            />
            <button
              className="w-full rounded-lg bg-yellow-500 py-3 font-bold text-white hover:bg-yellow-600"
              onClick={fetchCaptcha}
            >
              بارگیری مجدد کپچا
            </button>
            <input
              type="text"
              className="w-full rounded-lg border p-3  focus:ring-yellow-500"
              placeholder="Enter CAPTCHA Code"
              value={captchaCode}
              onChange={(e) => setCaptchaCode(e.target.value)}
            />
          </div>
          <button
            className="w-full rounded-lg bg-yellow-500 py-3 font-bold text-white hover:bg-yellow-600"
            onClick={handleReservation}
          >
            ثبت رزرو
          </button>
        </div>
      )}
    </div>
  );
};

export default FlightReservationForm;
