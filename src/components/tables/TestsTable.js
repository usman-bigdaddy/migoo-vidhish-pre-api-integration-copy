import React from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import DashboardCard from '../shared/DashboardCard';
import CrossImage from "../../assets/images/general/cross.svg";
import TickImage from "../../assets/images/general/tick.svg";
import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';

const products = [
    {
        id: 1,
        descriptionKey: "readingComprehension",
        studypoints: 250,
        status: false,
        link: "reading"
    },
    {
        id: 2,
        descriptionKey: "sentenceCompletions",
        studypoints: 300,
        status: true,
        link: "sentence-completion"
    },
    {
        id: 3,
        descriptionKey: "restatements",
        studypoints: 400,
        status: false,
        link: "restatements"
    },
    {
        id: 4,
        descriptionKey: "listening",
        studypoints: 140,
        status: true,
        link: "listening-test"
    },
];

const TestsTable = () => {
    const { t } = useTranslation();

    return (
        <DashboardCard title={t('tests.title')}>
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table aria-label="simple table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {t('tests.no')}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {t('tests.description')}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {t('tests.studyPoints')}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {t('tests.status')}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                        {product.id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            {t(`tests.descriptions.${product.descriptionKey}`)}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            {product.studypoints}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        component={NavLink}
                                        to={`/${product.link}`}
                                        style={{ color: product.status ? "green" : "red", display: 'flex', alignItems: 'center' }}
                                    >
                                        {product.status ? (
                                            <img src={TickImage} alt="tick" style={{ marginRight: 8, width: 20, height: 20 }} />
                                        ) : (
                                            <img src={CrossImage} alt="cross" style={{ marginRight: 8, width: 20, height: 20 }} />
                                        )}
                                        {product.status ? t('tests.complete') : t('tests.incomplete')}
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

export default TestsTable;
