import "./BtnList.scss";
import eventData from "../../../data/events.json";
import { useState } from "react";
import LinkBtn from "../../smallComponents/LinkBtn/LinkBtn";
import plus from "../../../assets/icons/icon_plus.svg";

const events = [
  {
    id: "b4690913-7899-4c21-b69a-250879bfaebf",
    title: "Monday Zen Yoga After Hours 🧘‍♂️",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lacinia eros vitae nunc feugiat sollicitudin. Donec suscipit, erat a rhoncus cursus, orci dui varius augue, vel blandit augue magna ut orci. Pellentesque in lorem volutpat, blandit urna eu, laoreet magna. Pellentesque sed eros tellus. Donec gravida porta nibh ac luctus. Aliquam eu magna vel lorem tincidunt faucibus ac vitae felis. Nam in sodales felis, nec dictum ex.",
    event_image: ["", ""],
    online: false,
    time_began: 0.6458333333333334,
    date_began: 45497,
    frequency: "weekly",
    location: {
      city: "vancouver",
      address: "2083 Alma St #242",
      province: "British Columbia",
    },
    group_id: 1,
  },
  {
    id: "c4690913-7ace-5555-b69a-250879bfaebf",
    title: "Tuesday Zen Yoga After Hours 🧘‍♂️",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lacinia eros vitae nunc feugiat sollicitudin. Donec suscipit, erat a rhoncus cursus, orci dui varius augue, vel blandit augue magna ut orci. Pellentesque in lorem volutpat, blandit urna eu, laoreet magna. Pellentesque sed eros tellus. Donec gravida porta nibh ac luctus. Aliquam eu magna vel lorem tincidunt faucibus ac vitae felis. Nam in sodales felis, nec dictum ex.",
    event_image: ["", ""],
    online: false,
    time_began: 0.6458333333333334,
    date_began: 45498,
    frequency: "weekly",
    location: {
      city: "vancouver",
      address: "2083 Alma St #242",
      province: "British Columbia",
    },
    group_id: 1,
  },
  {
    id: "d4690913-7ace-4c21-b69a-253435346ebf",
    title: "Wednesday Zen Yoga After Hours 🧘‍♂️",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lacinia eros vitae nunc feugiat sollicitudin. Donec suscipit, erat a rhoncus cursus, orci dui varius augue, vel blandit augue magna ut orci. Pellentesque in lorem volutpat, blandit urna eu, laoreet magna. Pellentesque sed eros tellus. Donec gravida porta nibh ac luctus. Aliquam eu magna vel lorem tincidunt faucibus ac vitae felis. Nam in sodales felis, nec dictum ex.",
    event_image: ["", ""],
    online: false,
    time_began: 0.6458333333333334,
    date_began: 45499,
    frequency: "weekly",
    location: {
      city: "vancouver",
      address: "2083 Alma St #242",
      province: "British Columbia",
    },
    group_id: 1,
  },
  {
    id: "d4690913-7ace-4c21-b69a-253435346ebf",
    title: "Wednesday Zen Yoga After Hours 🧘‍♂️",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lacinia eros vitae nunc feugiat sollicitudin. Donec suscipit, erat a rhoncus cursus, orci dui varius augue, vel blandit augue magna ut orci. Pellentesque in lorem volutpat, blandit urna eu, laoreet magna. Pellentesque sed eros tellus. Donec gravida porta nibh ac luctus. Aliquam eu magna vel lorem tincidunt faucibus ac vitae felis. Nam in sodales felis, nec dictum ex.",
    event_image: ["", ""],
    online: false,
    time_began: 0.6458333333333334,
    date_began: 45499,
    frequency: "weekly",
    location: {
      city: "vancouver",
      address: "2083 Alma St #242",
      province: "British Columbia",
    },
    group_id: 1,
  },
  {
    id: "d4690913-7ace-4c21-b69a-253435346ebf",
    title: "Wednesday Zen Yoga After Hours 🧘‍♂️",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lacinia eros vitae nunc feugiat sollicitudin. Donec suscipit, erat a rhoncus cursus, orci dui varius augue, vel blandit augue magna ut orci. Pellentesque in lorem volutpat, blandit urna eu, laoreet magna. Pellentesque sed eros tellus. Donec gravida porta nibh ac luctus. Aliquam eu magna vel lorem tincidunt faucibus ac vitae felis. Nam in sodales felis, nec dictum ex.",
    event_image: ["", ""],
    online: false,
    time_began: 0.6458333333333334,
    date_began: 45499,
    frequency: "weekly",
    location: {
      city: "vancouver",
      address: "2083 Alma St #242",
      province: "British Columbia",
    },
    group_id: 1,
  },
  {
    id: "d4690913-7ace-4c21-b69a-253435346ebf",
    title: "Wednesday Zen Yoga After Hours 🧘‍♂️",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lacinia eros vitae nunc feugiat sollicitudin. Donec suscipit, erat a rhoncus cursus, orci dui varius augue, vel blandit augue magna ut orci. Pellentesque in lorem volutpat, blandit urna eu, laoreet magna. Pellentesque sed eros tellus. Donec gravida porta nibh ac luctus. Aliquam eu magna vel lorem tincidunt faucibus ac vitae felis. Nam in sodales felis, nec dictum ex.",
    event_image: ["", ""],
    online: false,
    time_began: 0.6458333333333334,
    date_began: 45499,
    frequency: "weekly",
    location: {
      city: "vancouver",
      address: "2083 Alma St #242",
      province: "British Columbia",
    },
    group_id: 1,
  },
  {
    id: "d4690913-7ace-4c21-b69a-253435346ebf",
    title: "Wednesday Zen Yoga After Hours 🧘‍♂️",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lacinia eros vitae nunc feugiat sollicitudin. Donec suscipit, erat a rhoncus cursus, orci dui varius augue, vel blandit augue magna ut orci. Pellentesque in lorem volutpat, blandit urna eu, laoreet magna. Pellentesque sed eros tellus. Donec gravida porta nibh ac luctus. Aliquam eu magna vel lorem tincidunt faucibus ac vitae felis. Nam in sodales felis, nec dictum ex.",
    event_image: ["", ""],
    online: false,
    time_began: 0.6458333333333334,
    date_began: 45499,
    frequency: "weekly",
    location: {
      city: "vancouver",
      address: "2083 Alma St #242",
      province: "British Columbia",
    },
    group_id: 1,
  },
];

function BtnList({ groupdId }) {
  return (
    <section className="btnList">
      {events.map((each) => (
        <LinkBtn
          key={each.id}
          textBtn={each.title}
          padding={"1rem"}
          fontSize={"14px"}
          bgColor={"#6c3ed64f"}
          image={plus}
          imgHeight={"15px"}
        />
      ))}
    </section>
  );
}

export default BtnList;
