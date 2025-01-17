import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import axios from "axios";
import "./ExcelViewer.module.css";

const ExcelViewer = () => {
    const { profileId } = useParams();
    const [excelData, setExcelData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchExcelData(profileId);
    }, [profileId]);

    const fetchExcelData = async (profileId) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`/api/excel/getExcelData/${profileId}`);
            console.log("Response data:", response.data);

            if (Array.isArray(response.data)) {
                setExcelData(response.data); // Set the received array of rows
            } else {
                setExcelData([]);
                setError("No data found for the requested profile.");
            }
        } catch (err) {
            console.error("Error fetching Excel data:", err);
            setError("Failed to load the Excel data. Please try again.");
            setExcelData([]);
        } finally {
            setLoading(false);
        }
    };

    const updateLessonStatus = async (lessonColumn, status, category) => {
        console.log("Sending data:", { profileId, lessonColumn, status, category });

        try {
            await axios.post(`/api/excel/updateLessonStatus`, {
                profileId,
                lessonColumn,
                status,
                category, // Send category along with the other data
            });
            alert("Lesson status updated successfully!");
            fetchExcelData(profileId); // Refresh the data after update
        } catch (err) {
            console.error("Error updating lesson status:", err);
            alert("Failed to update the lesson status. Please try again.");
        }
    };

    const initializeExcelData = async (topic, subtopic, category) => {
        try {
            await axios.post(`/api/excel/initializeExcelData`, {
                profileId,
                topic,
                subtopic,
                category,
            });
            alert("Excel data initialized successfully!");
            fetchExcelData(profileId); // Refresh the data after initialization
        } catch (err) {
            console.error("Error initializing Excel data:", err);
            alert("Failed to initialize the Excel data. Please try again.");
        }
    };

    const handleEditCell = (rowIndex, colKey, value) => {
        const updatedData = [...excelData];
        updatedData[rowIndex][colKey] = value;
        setExcelData(updatedData); // Update local state immediately

        // Find the category from the current row (use lowercase 'category')
        const category = updatedData[rowIndex].category || "defaultCategory"; // Adjusted to match the response field name

        // Trigger lesson status update with category
        updateLessonStatus(colKey, value, category); // Update lesson status based on the modified column and category
    };

    // Filter out 'excelDataId' and 'profileId' from each row
    const filteredExcelData = excelData.map(row => {
        const { excelDataId, profileId, ...rest } = row;
        return rest;
    });

    if (loading) return <p>Loading Excel data...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="excel-viewer">
            <h1>Excel Data for Profile ID: {profileId}</h1>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            {filteredExcelData.length > 0 &&
                                Object.keys(filteredExcelData[0]).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExcelData.map((row, rowIndex) => (
                            <tr key={`row-${rowIndex}`}>
                                {Object.keys(row).map((colKey, colIndex) => (
                                    <td key={`cell-${rowIndex}-${colKey}`}>
                                        <input
                                            type="text"
                                            value={row[colKey] || ""}
                                            onChange={(e) =>
                                                handleEditCell(rowIndex, colKey, e.target.value)
                                            }
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExcelViewer;
