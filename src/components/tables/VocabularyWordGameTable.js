import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import DashboardCard from "../shared/DashboardCard";
import api from "../../redux/api/axiosInstance";
// import CrossImage from "../../../assets/images/general/cross.svg"
// import TickImage from "../../../assets/images/general/tick.svg"

const VocabularyWordGameTable = () => {
  const [englishWords, setEnglishWords] = useState([]);
  const [hebrewWords, setHebrewWords] = useState([]);
  useEffect(() => {
    const fetchVocabulary = async () => {
      try {
        const response = await api.get("/api/vocabulary/game");
        setEnglishWords(response.data.english);
        setHebrewWords(response.data.hebrew);
      } catch (err) {
        setError("Failed to load vocabulary");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVocabulary();
  }, []);
  return (
    <DashboardCard title={`Vocabulary`} subtitle={`10 words add this week`}>
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  SN
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  English
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Hewbrew
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {englishWords.map((eng, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {index + 1}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {eng}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {hebrewWords[index]}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default VocabularyWordGameTable;
