import React, { useEffect } from "react";
// import AchievementsTable from './components/AchievementsTable'
import Challenges from "./components/Challenges";
// import StudentPoints from './components/StudentPoints'
import StudentPoints from "../dashboard/components/StudentPoints";
import { Box } from "@mui/material";
import ChallengeCompletedModal from "../../components/modals/challengecompleted/ChallengeCompletedModal";
import TestsTable from "../../components/tables/TestsTable";
import { useDispatch, useSelector } from "react-redux";
import { getXp } from "../../redux/features/dashboardSlice";

const Achievements = () => {
  const dispatch = useDispatch();
  const {xp} = useSelector(state => state.dashboard)

  useEffect(() => {
    dispatch(getXp());
  }, [dispatch]);

  return (
    <div>
      {/* <div>Achievements Page</div> */}
      <Box maxWidth="900px">
        <ChallengeCompletedModal />
        <br />
        <StudentPoints xp={xp} />
        <br />
        <Challenges />
        <br />
        <TestsTable />
      </Box>
    </div>
  );
};

export default Achievements;
