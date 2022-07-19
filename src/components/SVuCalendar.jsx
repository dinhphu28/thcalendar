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
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Tooltip } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import viLocale from '@fullcalendar/core/locales/vi';

function SVuCalendar(props) {
  const [events, setEvents] = useState([
    {},{},{},{}
  ]);

  const [responseData, setResponseData] = useState({});
  const [selectedDate, setSelectedDate] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [timePicked, setTimePicked] = useState("00:00");
  const [selectedAllDay, setSelectedAllDay] = useState(false);
  const [hoveredEvent, setHoveredEvent] = useState();
  const [tooltipShow, setTooltipShow] = useState(false);

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
          {id: 1, title: "NHG", date: response.ngayHenGap},
          {id: 2, title: "NGLKN", date: response.ngayGoiLaiKhieuNai},
          {id: 3, title: "NHGL", date: response.ngayHenGoiLai},
          {id: 4, title: "NGH", date: response.ngayGiaohang},
        ];

        setEvents(dataEvents);

        // console.log("IUIUIU: ", dataEvents);

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
    const title = "NHG";

    if(title != null) {

      const hourValuePicked = timePicked.substring(0, 2);
      const minuteValuePicked = timePicked.substring(3);

      const dateInp = new Date(selectedDate.date);
      if(selectedAllDay) {
        dateInp.setHours(hourValuePicked);
        dateInp.setMinutes(minuteValuePicked);
      }

      console.log("VVV: ", selectedDate);

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
    const title = "NGLKN";

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
    const title = "NHGL";

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
    const title = "NGH";

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

      // setEvents(data);

      console.log("BBB: ", events);

      const eData = {
        ngayHenGap: data[0].date,
        ngayGoiLaiKhieuNai: data[1].date,
        ngayHenGoiLai: data[2].date,
        ngayGiaohang: data[3].date
      };

      fetchUpdateSuVuEvents(eData);

      setEvents(data);
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
      const title = "NHG";

      const eventHenGap = {
        id: 1,
        title: title,
        date: null
      };

      let data = [...events];
      data[0] = eventHenGap;
      
      setEvents(data);
      setHoveredEvent(null);

      const eData = {
        ngayHenGap: data[0].date,
        ngayGoiLaiKhieuNai: data[1].date,
        ngayHenGoiLai: data[2].date,
        ngayGiaohang: data[3].date
      };

      fetchUpdateSuVuEvents(eData);
    } else if(e.event.id === "2") {
      const title = "NGLKN";

      const eventGoiLai = {
        id: 2,
        title: title,
        date: null
      };

      let data = [...events];
      data[1] = eventGoiLai;

      setEvents(data);
      setHoveredEvent(null);

      const eData = {
        ngayHenGap: data[0].date,
        ngayGoiLaiKhieuNai: data[1].date,
        ngayHenGoiLai: data[2].date,
        ngayGiaohang: data[3].date
      };

      fetchUpdateSuVuEvents(eData);
    } else if(e.event.id === "3") {
      const title = "NHGL";

      const eventHenGoiLai = {
        id: 3,
        title: title,
        date: null
      };

      let data = [...events];
      data[2] = eventHenGoiLai;

      setEvents(data);
      setHoveredEvent(null);

      const eData = {
        ngayHenGap: data[0].date,
        ngayGoiLaiKhieuNai: data[1].date,
        ngayHenGoiLai: data[2].date,
        ngayGiaohang: data[3].date
      };

      fetchUpdateSuVuEvents(eData);
    } else if(e.event.id === "4") {
      const title = "NGH";

      const eventGiaohang = {
        id: 4,
        title: title,
        date: null
      };

      let data = [...events];
      data[3] = eventGiaohang;

      setEvents(data);
      setHoveredEvent(null);

      const eData = {
        ngayHenGap: data[0].date,
        ngayGoiLaiKhieuNai: data[1].date,
        ngayHenGoiLai: data[2].date,
        ngayGiaohang: data[3].date
      };

      fetchUpdateSuVuEvents(eData);
    }
  }

  const handleEventMouseHover = (e) => {
    // console.log("TVY", hoveredEvent);
    setHoveredEvent(e);
    setTooltipShow(!tooltipShow)
    // e.el.innerHTML += "<i>Cat yeah</i>"
    // console.log("VVV: ", e);
  }

  const handleToggleTooltip = () => setTooltipShow(!tooltipShow);

  const renderEventTooltip = () => {
    console.log("ToolTip rendering: ", events);

    return hoveredEvent ?
    <>
      {events[0].date !== null && hoveredEvent.event.id == events[0].id ? <Tooltip
        flip
        target="meow-event-1"
        isOpen={tooltipShow}
        toggle={handleToggleTooltip}
      >
        {hoveredEvent.event.title === "NHG" ? "Ngày giao hàng" : ""}
      </Tooltip> : "" }

      {events[1].date !== null && hoveredEvent.event.id == events[1].id ? <Tooltip
        flip
        target="meow-event-2"
        isOpen={tooltipShow}
        toggle={handleToggleTooltip}
      >
        {hoveredEvent.event.title === "NGLKN" ? "Ngày gọi lại khiếu nại" : ""}
      </Tooltip> : "" }

      {events[2].date !== null && hoveredEvent.event.id == events[2].id ? <Tooltip
        flip
        target="meow-event-3"
        isOpen={tooltipShow}
        toggle={handleToggleTooltip}
      >
        {hoveredEvent.event.title === "NHGL" ? "Ngày hẹn gọi lại" : ""}
      </Tooltip> : "" }

      {events[3].date !== null && hoveredEvent.event.id == events[3].id ? <Tooltip
        flip
        target="meow-event-4"
        isOpen={tooltipShow}
        toggle={handleToggleTooltip}
      >
        {hoveredEvent.event.title === "NGH" ? "Ngày giao hàng" : ""}
      </Tooltip> : "" }
    </>
      : <>""</>

    
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
        eventMouseEnter={e => handleEventMouseHover(e)}
        eventContent={(e) => {
          return (
            <>
            {/* <span
              id={"meow-event-" + e.event.id}
              > */}
              {/* <a class="fc-daygrid-event fc-daygrid-dot-event fc-event fc-event-start fc-event-end fc-event-future">
                <div class="fc-daygrid-event-dot"></div><div class="fc-event-time">13:38</div>
                <div class="fc-event-title">NGH</div>
              </a> */}
              <div class="fc-daygrid-event-dot"></div>
              <div className="fc-event-time">{e.timeText}</div><div id={"meow-event-" + e.event.id} className="fc-event-title">{e.event.title}</div>
              
            {/* </span> */}
            </>
          )
        }}
        // eventDidMount
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

      {renderEventTooltip()}
    </div>
  );
}

export default SVuCalendar;