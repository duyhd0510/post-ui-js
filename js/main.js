import axiosClient from "./api/axiosClient";
import postApi from "./api/postApi";

async function main() {
  try {
    const queryParams = {
      _page: 1,
      _limit: 5,
    }
    const data = await postApi.getAll(queryParams);
    console.log(data);
  } catch (error) {
    console.log('get all failed', error);
  }
}

main();
