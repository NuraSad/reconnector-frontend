import { useEffect, useState } from "react";
import "./Leaderboard.scss";
import medalIcon from "../../assets/icons/icon_medal.svg";
import peopleGroupIcon from "../../assets/icons/icon_people-group.svg";
import starIcon from "../../assets/icons/icon_star.svg";
import supabase from "../../config/supabaseClient";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      const { data, error } = await supabase.from("company").select();
      if (error) {
        setFetchError("Could not Fetch the Company");
      }
      if (data) {
        setLeaderboardData(data);
        setFetchError(null);
      }
    };

    fetchCompany();
  }, []);

  useEffect(() => {
    if (leaderboardData.length == 0) return;
    const companyIds = leaderboardData.map((company) => company.id);

    const fetchEmployeeCount = async () => {
      const { data: employeeCount, error } = await supabase.rpc(
        `getemployeecount`,
        { company_ids: companyIds }
      );

      if (error) {
        console.log("error", error);
        setFetchError(error.message);
      } else {
        const newLeaderBoardData1 = leaderboardData.map((company) => {
          const foundEmp = employeeCount.find(
            (item) => item.company_id === company.id
          );
          return {
            ...company,
            employeeCount: foundEmp ? foundEmp.employee_count : 0, // Default to 0 if employee count is not found
          };
        });

        if (
          JSON.stringify(newLeaderBoardData1) !==
          JSON.stringify(leaderboardData)
        ) {
          setLeaderboardData(newLeaderBoardData1);
          setFetchError("");
        }
      }
    };

    const medalCount = async () => {
      const { data: medalFound, error } = await supabase.rpc(`getmedals`, {
        company_ids: companyIds,
      });
      if (error) {
        setFetchError("Cannot extract number of medals for each company");
      } else {
        const newLeaderBoardDataWithMedalCount = leaderboardData.map(
          (company) => {
            const foundMed = medalFound.find(
              (item) => item.company_id === company.id
            );
            if (foundMed)
              return { ...company, medal_count: foundMed.medal_count };
            else {
              return company;
            }
          }
        );

        if (
          JSON.stringify(newLeaderBoardDataWithMedalCount) !==
          JSON.stringify(leaderboardData)
        ) {
          setLeaderboardData(newLeaderBoardDataWithMedalCount);
          setFetchError("");
        }
      }
    };
    fetchEmployeeCount();
    medalCount();
  }, [leaderboardData]);

  return (
    <section className="leaderboard">
      <h1 className="leaderboard__title page-font">Leaderboard</h1>
      <div className="leaderboard__bubble-container">
        {fetchError ? (
          <>{fetchError}</>
        ) : (
          leaderboardData
            .sort((a, b) => b.points - a.points)
            .map((company, index) => (
              <div
                className="company-bubble"
                key={company.id}
                style={{
                  // backgroundImage: `url(${company.logo})`,
                  width: `${company.points / 20}%`,
                  height: `${company.points / 20}%`,
                  minHeight: "200px",
                  minWidth: "200px",
                  // bottom: `${Math.floor(Math.random() * 70) + 20}px`,
                  // right: `${Math.floor(Math.random() * 70) + 10}px`,
                }}
                onClick={() =>
                  navigate(`/leaderboards/${company.id}`, {
                    state: {
                      companyId: company.id,
                      companyName: company.name,
                      logo: company.logo,
                      points: company.points,
                      medals: company.medal_count,
                      employeeCount: company.employeeCount,
                      description: company.description,
                    },
                  })
                }
              >
                <div
                  style={{
                    minHeight: "100px",
                    height: `${company.points / 10}%`,
                  }}
                  className="company-bubble__logo-wrapper"
                >
                  <div
                    className="company-bubble__logo"
                    style={{
                      backgroundImage: `url(${company.logo})`,
                      minHeight: "100px",
                      maxHeight: "500px",
                      // height: `${company.points / 5}%`,
                    }}
                  />
                  <h2 className="company-bubble__name"></h2>
                </div>

                <div className="company-bubble__stats-wrapper">
                  <div className="stats-item">
                    <img src={`${peopleGroupIcon}`} alt="Employee Count" />
                    {company.employeeCount !== 0 ? company.employeeCount : ""}
                  </div>
                  <div className="stats-item">
                    <img src={`${starIcon}`} alt="Company Score" />
                    {company.points !== 0 ? company.points : ""}
                  </div>
                  <div className="stats-item">
                    <img src={`${medalIcon}`} alt="Medals won" />
                    {company.medal_count !== 0 ? company.medal_count : ""}
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </section>
  );
};

export default Leaderboard;
