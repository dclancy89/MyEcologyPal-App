import Geolocation from "react-native-geolocation-service";

export const generateMetaData = async (
  userData: any,
  locationId: number,
  dataTemplateType: string,
  setIsLoading: any,
  setDataToSave: any,
  setShowConfirmModal: any
) => {
  setIsLoading(true);

  const data = {
    template: dataTemplateType,
    data: JSON.stringify(userData),
    location: {},
    timestamp: Date.now(),
    locationId: locationId,
  };

  Geolocation.getCurrentPosition(
    async (position: any) => {
      data.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      setDataToSave(data);
      setShowConfirmModal(true);
      console.log(data);
      setIsLoading(false);
    },
    (error) => {
      // See error code charts below.
      alert("Error determining Location. Please try again.");
      console.log(error.code, error.message);
      setIsLoading(false);
    },
    {
      accuracy: { android: "high" },
      enableHighAccuracy: true,
      timeout: 3000,
      maximumAge: 10000,
    }
  );
};
