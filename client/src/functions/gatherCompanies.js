import { getAllCompanies } from "../services/admin-info";

export default async function gatherCompanies(setCompanyInfo) {
  const companyInfo = await getAllCompanies();
  setCompanyInfo(companyInfo);
};