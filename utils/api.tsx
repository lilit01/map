import { AddressParams } from "@/app/landing-page/LandingPage";

export const fetchStreetData = async ({ addr_street, addr_city, addr_num, addr_zip }: AddressParams): Promise<any> => {
  try {
    const url = new URL('https://api.thebuilder.ai/prop_query');
    const params = new URLSearchParams({
      addr_num,
      addr_street,
      addr_city,
      addr_zip
    });

    url.search = params.toString();

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
