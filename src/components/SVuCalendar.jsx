import React, { useState } from "react";
// import ReactDOM from "react-dom";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SpTicketsApi from '../apis/SpTicketsApi';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import viLocale from '@fullcalendar/core/locales/vi';

function SVuCalendar(props) {
  const [events, setEvents] = useState([
    // {id: 1, title: "Ngày hẹn gặp", date: "2022-06-13"},
    // {id: 2, title: "Event 02", date: "2022-06-14"}
    {},{},{},{}
  ]);

  const [responseData, setResponseData] = useState({});
  const [selectedDate, setSelectedDate] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [timePicked, setTimePicked] = useState("00:00");
  const [selectedAllDay, setSelectedAllDay] = useState(false);

  const toggle = () => setModalIsOpen(!modalIsOpen);

  const location = useLocation();
  // console.log("Current URL: ", location.pathname);

  const changeTimeInputValue = (e) => {
    setTimePicked(e.target.value);
  }

  useEffect(() => {
    const fetchSuVuEvents = async () => {
      try {
        const response = await SpTicketsApi.getById((location.pathname.substring(1).length !== 0) ? location.pathname.substring(1) : "zz");

        setResponseData(response);

        const dataEvents = [
          {id: 1, title: "Ngày hẹn gặp", date: response.ngayHenGap},
          {id: 2, title: "Ngày gọi lại khiếu nại", date: response.ngayGoiLaiKhieuNai},
          {id: 3, title: "Ngày hẹn gọi lại", date: response.ngayHenGoiLai},
          {id: 4, title: "Ngày giao hàng", date: response.ngayGiaohang},
        ];

        setEvents(dataEvents);

        // console.log("Fetch events successfully: ", response);

      } catch (error) {
        console.log("Failed to fetch get events: ", error);
        // console.log("Response Data state: ", (Object.keys(responseData).length === 0) ? "Right" : "Wrong");
      }
    }

    fetchSuVuEvents();
  }, [location.pathname]);

  const fetchUpdateSuVuEvents = async (data) => {
    try {

      const response = await SpTicketsApi.put(responseData.id, data);

      // console.log("Fetch update events successfully: ", response);
      
    } catch (error) {
      console.log("Failed to fetch update events: ", error);
    }
  }

  const handleClickHenGap = () => {
    const title = "Ngày hẹn gặp";

    if(title != null) {

      const hourValuePicked = timePicked.substring(0, 2);
      const minuteValuePicked = timePicked.substring(3);

      const dateInp = new Date(selectedDate.date);
      if(selectedAllDay) {
        dateInp.setHours(hourValuePicked);
        dateInp.setMinutes(minuteValuePicked);
      }

      const eventHenGap = {
        id: 1,
        title: title,
        // date: makeDateTimeSelectedAsUTCStr(selectedDate.date)
        date: makeDateTimeSelectedAsUTCStr(dateInp)
      };

      // console.log("TVY: ", eventHenGap.date);

      let data = [...events];
      data[0] = eventHenGap;

      setEvents(data);

      const eData = {
        ngayHenGap: data[0].date,
        ngayGoiLaiKhieuNai: data[1].date,
        ngayHenGoiLai: data[2].date,
        ngayGiaohang: data[3].date
      };

      fetchUpdateSuVuEvents(eData);
    }
  }

  const handleClickGoiLaiKhieuNai = () => {
    const title = "Ngày gọi lại khiếu nại";

    if(title != null) {

      const hourValuePicked = timePicked.substring(0, 2);
      const minuteValuePicked = timePicked.substring(3);

      const dateInp = new Date(selectedDate.date);
      if(selectedAllDay) {
        dateInp.setHours(hourValuePicked);
        dateInp.setMinutes(minuteValuePicked);
      }

      const eventGoiLai = {
        id: 2,
        title: title,
        date: makeDateTimeSelectedAsUTCStr(dateInp)
      };

      // console.log("Select all day: ", selectedDate.allDay);

      let data = [...events];
      data[1] = eventGoiLai;

      setEvents(data);

      const eData = {
        ngayHenGap: data[0].date,
        ngayGoiLaiKhieuNai: data[1].date,
        ngayHenGoiLai: data[2].date,
        ngayGiaohang: data[3].date
      };

      fetchUpdateSuVuEvents(eData);
    }
  }

  const handleClickHenGoiLai = () => {
    const title = "Ngày hẹn gọi lại";

    if(title != null) {

      const hourValuePicked = timePicked.substring(0, 2);
      const minuteValuePicked = timePicked.substring(3);

      const dateInp = new Date(selectedDate.date);
      if(selectedAllDay) {
        dateInp.setHours(hourValuePicked);
        dateInp.setMinutes(minuteValuePicked);
      }

      const eventHenGoiLai = {
        id: 3,
        title: title,
        date: makeDateTimeSelectedAsUTCStr(dateInp)
      };

      let data = [...events];
      data[2] = eventHenGoiLai;

      setEvents(data);

      const eData = {
        ngayHenGap: data[0].date,
        ngayGoiLaiKhieuNai: data[1].date,
        ngayHenGoiLai: data[2].date,
        ngayGiaohang: data[3].date
      };

      fetchUpdateSuVuEvents(eData);
    }
  }

  const handleClickGiaohang = () => {
    const title = "Ngày giao hàng";

    if(title != null) {

      const hourValuePicked = timePicked.substring(0, 2);
      const minuteValuePicked = timePicked.substring(3);

      const dateInp = new Date(selectedDate.date);
      if(selectedAllDay) {
        dateInp.setHours(hourValuePicked);
        dateInp.setMinutes(minuteValuePicked);
      }

      const eventGiaohang = {
        id: 4,
        title: title,
        date: makeDateTimeSelectedAsUTCStr(dateInp)
      };

      let data = [...events];
      data[3] = eventGiaohang;

      setEvents(data);

      const eData = {
        ngayHenGap: data[0].date,
        ngayGoiLaiKhieuNai: data[1].date,
        ngayHenGoiLai: data[2].date,
        ngayGiaohang: data[3].date
      };

      fetchUpdateSuVuEvents(eData);
    }
  }

  const addHours = (numOfHours, date = new Date()) => {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

    return date;
  }

  const makeDateTimeSelectedAsUTCStr = (date = new Date()) => {
    return addHours(date.getTimezoneOffset()/(-60), date).toISOString().substring(0, 23);
  }

  const handleDateClick = (e) => {

    if(!(Object.keys(responseData).length === 0)) {
      setSelectedDate(e);
      setSelectedAllDay(e.allDay);
      // console.log("zz: ", addHours(e.date.getTimezoneOffset()/(-60), e.date).toISOString().substring(0, 23));
      // console.log("zz2", makeDateTimeSelectedAsUTCStr(e.date));

      toggle();
    } else {
      alert("Ticket chưa được tạo");
    }
  }
  
  const handleEventClick = (e) => {
    // alert("Event clicked: " + e.event.id);
    if(e.event.id === "1") {
      const title = "Ngày hẹn gặp";

      const eventHenGap = {
        id: 1,
        title: title,
        date: null
      };

      let data = [...events];
      data[0] = eventHenGap;
      
      setEvents(data);

      const eData = {
        ngayHenGap: data[0].date,
        ngayGoiLaiKhieuNai: data[1].date,
        ngayHenGoiLai: data[2].date,
        ngayGiaohang: data[3].date
      };

      fetchUpdateSuVuEvents(eData);
    } else if(e.event.id === "2") {
      const title = "Ngày gọi lại khiếu nại";

      const eventGoiLai = {
        id: 2,
        title: title,
        date: null
      };

      let data = [...events];
      data[1] = eventGoiLai;

      setEvents(data);

      const eData = {
        ngayHenGap: data[0].date,
        ngayGoiLaiKhieuNai: data[1].date,
        ngayHenGoiLai: data[2].date,
        ngayGiaohang: data[3].date
      };

      fetchUpdateSuVuEvents(eData);
    } else if(e.event.id === "3") {
      const title = "Ngày hẹn gọi lại";

      const eventHenGoiLai = {
        id: 3,
        title: title,
        date: null
      };

      let data = [...events];
      data[2] = eventHenGoiLai;

      setEvents(data);

      const eData = {
        ngayHenGap: data[0].date,
        ngayGoiLaiKhieuNai: data[1].date,
        ngayHenGoiLai: data[2].date,
        ngayGiaohang: data[3].date
      };

      fetchUpdateSuVuEvents(eData);
    } else if(e.event.id === "4") {
      const title = "Ngày giao hàng";

      const eventGiaohang = {
        id: 4,
        title: title,
        date: null
      };

      let data = [...events];
      data[3] = eventGiaohang;

      setEvents(data);

      const eData = {
        ngayHenGap: data[0].date,
        ngayGoiLaiKhieuNai: data[1].date,
        ngayHenGoiLai: data[2].date,
        ngayGiaohang: data[3].date
      };

      fetchUpdateSuVuEvents(eData);
    }
  }

  return (
    <div>
      <FullCalendar
        schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
      //   ref={this.calendarComponentRef}
        defaultView="dayGridMonth"
        dateClick={handleDateClick}
        // displayEventTime={true}
        headerToolbar={{
          left: "title",
          center: "dayGridMonth,timeGridWeek,timeGridDay",
          right: "today prev,next"
        }}
        selectable={true}
        plugins={[
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
          resourceTimeGridPlugin
        ]}
        eventClick={handleEventClick}
        events={events}
        // select={handleSelectedDates}
        // eventLimit={3}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          // second: '2-digit',
          hour12: false,
          meridiem: false
        }}
        locale={viLocale}
      />

      <Modal
          isOpen={modalIsOpen}
          toggle={toggle}
      >
          <ModalHeader toggle={toggle}>
              Đang chọn ngày: {selectedDate.dateStr}
          </ModalHeader>
          <ModalBody>
              Chọn event mà bạn muốn thêm
              {selectedAllDay ?
              <Input 
                type="time"
                name="time"
                onChange={e => changeTimeInputValue(e)}
                value={timePicked}
              />
              : ""}
          </ModalBody>
          <ModalFooter>
              <Button
                  color="primary"
                  onClick={() => {
                    handleClickHenGap();
                    setModalIsOpen(false);
                  }}
              >
                  Hẹn gặp
              </Button>
              {' '}
              <Button
                  color="primary"
                  onClick={() => {
                    handleClickGoiLaiKhieuNai();
                    setModalIsOpen(false);
                  }}
              >
                  Gọi lại khiếu nại
              </Button>
              {' '}
              <Button
                  color="primary"
                  onClick={() => {
                    handleClickHenGoiLai();
                    setModalIsOpen(false);
                  }}
              >
                  Hẹn gọi lại
              </Button>
              {' '}
              <Button
                  color="primary"
                  onClick={() => {
                    handleClickGiaohang();
                    setModalIsOpen(false);
                  }}
              >
                  Giao hàng
              </Button>
              {/* {' '}
              <Button onClick={() => {
                    setModalIsOpen(false);
                  }}>
                  Cancel
              </Button> */}
          </ModalFooter>
      </Modal>
    </div>
  );
}

export default SVuCalendar;