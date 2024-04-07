import React, { useState } from "react";

const ImageForm = () => {
  const [base64String, setBase64String] = useState("");
  const [responseData, setResponseData] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setBase64String(base64String);

      // Make API call here using fetch or axios
      const apiUrl = "https://api.plant.id/v2/identify";
      const data = {
        api_key: "leh6yIXxqa7iH9gJbGIvG2GzkurBoERWjhpPF9P26E1XVdd21K",
        images: base64String,
        // modifiers docs: https://github.com/flowerchecker/Plant-id-API/wiki/Modifiers
        modifiers: ["crops_fast"],
        plant_language: "en",
        latitude: 18.5195982,
        longitude: 73.8563344,
        // plant details docs: https://github.com/flowerchecker/Plant-id-API/wiki/Plant-details
        plant_details: [
          "common_names",
          "url",
          "name_authority", //The response contains a string with the scientific name of the plant.
          "wiki_description", //The response contains a string with the link to the page with the plant profile (usually Wikipedia or Google).
          "taxonomy", //The response contains a dictionary with the plant taxonomy.
          "synonyms", //  The response contains a list of other names of the plant.
          "watering", // The response contains two values - min and max, which represents the range on the following scale of how wet the environment the plant prefers.
        ],
      };
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setResponseData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full mt-2  flex justify-center items-center">
      <div className="">
      <input
        required
        type="file"
        accept="image/*"
        onChange={handleFormSubmit}
      />

      {responseData && (
        <div className="flex flex-col items-center justify-center">
        <div className="main  flex gap-10 w-full">
          <div className="w-[280px] mt-4 p-1 rounded-md ">
            <img
              src={`data:image/jpeg;base64,${base64String}`}
              alt="Laptop"
              className="h-[250px] w-full rounded-md object-cover"
            />
          </div>
          <div className="p-4 w-[80%">
            <h1 className="text-lg font-semibold">
              Plant name : {responseData.suggestions[0].plant_name}
            </h1>
            <br />
            <h2>
              <span className="font-bold">Scientific Name: </span>
              {responseData.suggestions[0].plant_details.scientific_name}{" "}
            </h2>
            <br />
            <h2>
              <span className="font-bold">Probability: </span>{responseData.suggestions[0].probability * 100}%{" "}
            </h2>
            <br />
            <h2>
              <span className="font-bold">Common Names:</span>
              {responseData.suggestions[0].plant_details.common_names.map(
                (nam, idx) => (
                  <li key={idx}>{nam}</li>
                )
              )}
            </h2>
            <br />
            
          </div>
        </div>
        <div>
          <h2 className="w-3/4">
              <span className="font-bold">Wiki Description: </span>
                {responseData.suggestions[0].plant_details.wiki_description.value}
            </h2>
          </div>
      </div>    

        
      )}
      </div>
    </div>
  );
};

export default ImageForm;
