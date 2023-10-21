import { toast } from "react-toastify";

export const baseUrl = "https://admin.pawsitiv.dog/api";

export const globalFetcher = (link) => fetch(link).then((res) => res.json());

export const fetchBreedList = async () => {
  const response = await fetch(`${baseUrl}/breed-listings?user_id=0`);

  const responseData = await response.json();
  return responseData;
};

export const fetchBreedDetail = async (id) => {
  const response = await fetch(`${baseUrl}/breed/${id}/details?user_id=10`);
  const responseData = await response.json();
  return responseData;
};

// fetch club listings
export const fetchClubList = async () => {
  const response = await fetch(`${baseUrl}/club-listings?user_id=0`);
  const responseData = await response.json();
  return responseData;
};

// fetch club details
export const fetchClubDetails = async (id) => {
  const response = await fetch(`${baseUrl}/club/${id}/details?user_id=0`);
  const responseData = await response.json();
  return responseData;
};
export const fetchDogNames = async () => {
  const response = await fetch(`${baseUrl}/breed-short?user_id=0`);
  const responseData = await response.json();
  return responseData;
};

export const fetchJudgeList = async () => {
  const response = await fetch(`${baseUrl}/judge-listings?user_id=0`);
  const responseData = await response.json();
  return responseData;
};

export const fetchJudgeDetail = async (id) => {
  const response = await fetch(`${baseUrl}/judge/${id}/details?user_id=0`);
  const responseData = await response.json();
  return responseData;
};

export const fetchCountryNames = async () => {
  const response = await fetch(`${baseUrl}/countries`);
  const responseData = await response.json();
  return responseData;
};

export const fetchClubNames = async () => {
  const response = await fetch(`${baseUrl}/club-names`);
  const responseData = await response.json();
  return responseData;
};

export const fetchBreedProfiles = async (id) => {
  const response = await fetch(`${baseUrl}/dog/${id}/listings?user_id=0`);

  const responseData = await response.json();
  return responseData;
};

export const fetchBreedProfile = async (id) => {
  const response = await fetch(`${baseUrl}/dog/${id}/details?user_id=0`);

  const responseData = await response.json();
  return responseData;
};

export const fetchStatistics = async () => {
  const response = await fetch(`${baseUrl}/statistic`);

  const responseData = await response.json();
  return responseData;
};

export const fetchEventDetails = async (id) => {
  const response = await fetch(`${baseUrl}/event/${id}/result`);

  const responseData = await response.json();
  return responseData;
};

export const fetchRecentResults = async () => {
  const response = await fetch(`${baseUrl}/result-listing`);

  const responseData = await response.json();
  return responseData;
};

export const postSubscription = async (subscribeDetails) => {
  const body = JSON.stringify(subscribeDetails);

  const response = await fetch(`${baseUrl}/add-subscription`, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    toast.success("You have been subscribed successfully!");
  } else {
    toast.error(
      "Unfortunately, there was an error subscribing you to our website. Please try later."
    );
  }

  return response;
};

// this is simple contact API 

export const postContact = (formData) => {
  fetch(`${baseUrl}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      toast.success(data.Result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// this is CLUB CONTACT API 
export const postClubContact = (formData) => {
  fetch(`${baseUrl}/club-contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      toast.success(data.Result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

///////Add result api///////

export const postAddResult = (formData) => {
  fetch(`${baseUrl}/event-file-approve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      toast.success(data.Result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

}


///////////////////
//// Next API ////
/////////////////

export const verifyCaptcha = async (token) => {
  const response = await fetch("/api/captcha-verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  const responseData = await response.json();
  return responseData;
};
