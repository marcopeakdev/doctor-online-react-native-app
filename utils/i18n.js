import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import Expo from "expo";

// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
const languageDetector = {
  type: "languageDetector",
  async: true, // flags below detection to be async
  //   detect: (callback) => { return /*'en'; */ Localization.getLocalizationAsync().then(({ locale }) => { callback(locale); }) },
  detect: callback => {
    return /*'en'; */ Expo.DangerZone.Localization.getCurrentLocaleAsync().then(
      lng => {
        callback(lng.replace("_", "-"));
      }
    );
  },
  init: () => {},
  cacheUserLanguage: () => {}
};

i18n
  .use(languageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: "en",

    resources: {
      en: {
        more: {
          title: "More",
          appointmentmanage: "Appointment Manage",
          settings: "Settings",
          contactus: "Contact Us",
          aboutus: "About Us",
          logout: "LogOut",
          medicalinformation: "medical information",
          commingsoon: "Comming Soon",
          notification: "Notification",
          booksuccess: "Book Success",
          favouritedoctor: "Favourite Doctors",
          arabic: "Arabic",
          english: "English"
        },
        settings: {
          editprofile: "Edit my Profile",
          loginedityourprofile: "LogIn to Edit your profile",
          changemycountry: "Change my Country",
          changelanguage: "Change Language",
          schedule: "Schedule"
        },
        offer: {
          title: "Offers",
          content: "This is no Offers",
          hello: "Hellow World"
        },
        appointment: {
          title: "Appointment",
          content: "Login to see your appointments",
          topic: "You Have an appointment in",
          done: "Done",
          from: "from",
          to: "to"
        },
        first: {
          description: "Book the Best Doctors in Kuwait",
          input1: "Choose by Speciality and Area",
          input2: "Search By Doctor Name",
          login: "Login"
        },
        other: {
          or: "Or",
          register: "REGISTER",
          search: "Search",
          home: "Home",
          appointment: "Appointment",
          offers: "Offers",
          more: "More",
          chooseyourarea: "Choose Your Area",
          chooseyourdoctor: "Choose Your Doctor",
          doctor: "Doctor",
          block: "Block",
          street: "Street",
          building: "Building",
          floor: "Floor",
          profession: "Profession",
          waitingtime: "waiting Time",
          votes: "Rates",
          book: "Book",
          bookdescription:
            "Book now and you will recieve full address details and clinic number",
          fees: "Fees",
          from: "from",
          to: "To",
          googlemaps: "Google Map",
          visitors: "Visitors",
          today: "Today",
          tomorrow: "Tomorrow",
          aftertomorrow: "After tomorrow",
          doctorprofile: "Doctor Profile",
          views: "Views",
          speciality: "Choose by Speciality",
          username: "Username",
          password: "Password",
          firstname: "First Name",
          lastname: "Last Name",
          phonenumber: "Phone Number",
          searchplaceholder: "Search By Doctor name...",
          loading: "loading...",
          confirm: "Confirm",
          showdatepicker: "Show Datepicker",
          ratingpage: "Rating Page",
          ratingvisiterror: "You Need To LogIn Or Register To Rate Any Doctor",
          ratingcontent: "How would you describe your visit to Doctor",
          ratealert: "your rate has been Submited",
          book: "Book",
          cancel: 'Cancel',
          newappointment: 'New Appointment',
          save: 'Save',
          editappointment: "Edit Appointment",
          deleteappointment: "Delete Appointment",
          onlydoctor: "This page must use only doctors",
          pleaselogin: "Please login"
        },
        edit: {
          waitingtime: "waiting_time",
          enterdate: "please enter HH:MM:SS",
          enterint: "please enter an integer",
          enterlink: "please enter a link",
          fees: "fees",
          openingfile: "opening_file",
          block: "block",
          street: "street",
          building: "building",
          floor: "floor",
          googlemaps: "google_maps",
          description: "description",
          service: "service",
          confirm: "CONFIRM",
          nothing: "Nothing is here",
          yourreservationis: "Your Reservation is",
          reservationday: "Reservation Day",
          bookedsuccess: "Booked Successfully!",
          pleaselogin: "Please login",
          schedule: "Schedule"
        },
        book: {
          patientname: "Patient Name",
          date: "Date",
          reservationtime: "Reservation Time",
          doctor: "Doctor",
          yourname: "Your Name",
          booked: "Book Schedule",
          doctorname: "Doctor Name"
        }
      },
      ar: {
        more: {
          title: "المزيد",
          appointmentmanage: "إدارة المواعيد",
          settings: "الإعدادات",
          contactus: "اتصل بنا",
          aboutus: "معلومات عنا",
          logout: "تسجيل خروج",
          medicalinformation: "معلومات طبية",
          commingsoon: "قريبا",
          notification: "إعلام",
          favouritedoctor: "الأطباء المفضلون",
          booksuccess: "حجز النجاح",
          arabic: "عربى",
          english: "الإنجليزية"
        },
        settings: {
          editprofile: "تعديل ملفي الشخصي",
          loginedityourprofile: "يجب تسجيل الدخول",
          changemycountry: "تغيير بلدي",
          changelanguage: "تغير اللغة",
          schedule: "جدول"
        },
        offer: {
          title: "عروض",
          content: "ليست هناك عروض",
          hello: "مرحبا"
        },
        appointment: {
          title: "موعد",
          content: "سجل دخول لرؤية مواعيدك",
          topic: "لديك موعد في",
          done: "تم",
          from: "من",
          to: "إلى"
        },
        first: {
          description: "احجز أفضل الأطباء في الكويت",
          input1: "اختر حسب التخصص والمنطقة",
          input2: "البحث عن طريق اسم الطبيب",
          login: "تسجيل الدخول"
        },
        other: {
          or: "أو",
          register: "تسجيل",
          search: "بحث",
          home: "الصفحة الرئيسية",
          appointment: "موعد",
          offers: "عروض",
          more: "المزيد",
          chooseyourarea: "اختر منطقتك",
          chooseyourdoctor: "اختر طبيبك",
          doctor: "طبيب",
          block: "قطعة",
          street: "شارع",
          building: "مبنى",
          floor: "الدور",
          profession: "مهنة",
          waitingtime: "وقت الانتظار",
          votes: "الأصوات",
          book: "احجز",
          bookdescription:
            "احجز الآن وستتلقى تفاصيل العنوان الكامل ورقم العيادة",
          fees: "رسوم",
          from: "من",
          to: "إلى",
          googlemaps: "خرائط جوجل",
          visitors: "الزائرين",
          today: "اليوم",
          doctorprofile: "الملف الشخصي الطبيب",
          views: "الآراء",
          speciality: "اختر من خلال التخصص",
          username: "اسم المستخدم",
          password: "كلمه السر",
          firstname: "الاسم الاول",
          lastname: "اسم العائلة",
          phonenumber: "رقم الهاتف",
          searchplaceholder: "البحث عن طريق اسم الدكتور ...",
          loading: "جار التحميل...",
          confirm: "تأكيد",
          showdatepicker: "إظهار منتقي التاريخ",
          ratingpage: "تصنيف الصفحة",
          ratingvisiterror: "تحتاج إلى تسجيل الدخول أو التسجيل لمعدل أي طبيب",
          ratingcontent: "كيف تصف زيارتك إلى الطبيب",
          ratealert: "تم إرسال المعدل الخاص بك",
          tomorrow: "غدا",
          aftertomorrow: "بعد غد",
          book: "احجز",
          yourreservationis: "الحجز الخاص بك هو",
          reservationday: "يوم الحجز",
          bookedsuccess: "تم الحجز بنجاح!",
          pleaselogin: "الرجاء تسجيل الدخول",
          schedule: "جدول",
          cancel: 'إلغاء',
          newappointment: 'موعد جديد',
          save: 'حفظ',
          editappointment: "تحرير موعد",
          deleteappointment: "حذف موعد",
          onlydoctor: "يجب أن تستخدم هذه الصفحة الأطباء فقط"
        },
        edit: {
          waitingtime: "وقت الانتظار",
          enterdate: "الرجاء إدخال HH: MM: SS",
          enterint: "يرجى إدخال عدد صحيح",
          fees: "رسوم",
          openingfile: "فتح الملف",
          block: "قطعة",
          street: "شارع",
          building: "مبنى",
          floor: "دور",
          googlemaps: "خرائط جوجل",
          description: "وصف",
          service: "الخدمات",
          confirm: "تأكيد",
          enterlink: "يرجى إدخال رابط",
          nothing: "لا شيء هنا"
        },
        book: {
          patientname: "اسم المريض",
          date: "تاريخ",
          reservationtime: "وقت الحجز",
          doctor: "طبيب",
          yourname: "اسمك",
          booked: "جدول الكتاب",
          doctorname: "اسم الطبيب"
        }
      }
    },

    // have a common namespace used around the full app
    ns: ["common"],
    defaultNS: "common",

    debug: true,

    // cache: {
    //   enabled: true
    // },

    interpolation: {
      escapeValue: false // not needed for react as it does escape per default to prevent xss!
    }
  });

export default i18n;
