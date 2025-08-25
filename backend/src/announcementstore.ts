import { Request, Response } from "express";
export interface announcement {
  id: string;
  title: string;
  description?: String;
  status: "active" | "closed";
  createdAt: Date;
}

export const allann: announcement[] = [];

export async function getAll(req: Request, res: Response) {
  try {
    console.log(
      "This is the backend router returning all the announcements of the user notice board "
    );
    const sortedAnnouncements = [...allann].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
    console.log(sortedAnnouncements);

    return res.status(200).json({
      announcements: sortedAnnouncements,
      success: true,
      count: sortedAnnouncements.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An unexpected error occured ",
      error: error,
    });
  }
}

export async function addAnn(req: Request, res: Response) {
  try {
    const { id, title, description, status } = req.body;

    if (!title) {
      return res.json({
        message: "Please enter teh title to continue adding",
      });
    }

    const newAnn: announcement = {
      id: id,
      title: title,
      description: description,
      status: "active",
      createdAt: new Date(),
    };

    allann.push(newAnn);
    console.log("added announcement", newAnn);

    return res.status(201).json({
      message: "Announcement added successfully",
      announcement: newAnn,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An unexpected error occurred",
      error,
    });
  }
}

export async function changeStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const announcement = allann.find((c) => c.id === id);

    if (!announcement) {
      return res
        .status(404)
        .json({ message: `Announcement with id ${id} not found` });
    }
    announcement.status = "closed";
    console.log("changed status of the ", id);
    return res.json({
      message: ` the announecemt with the id ${id} and status changes to the ${announcement?.status}`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An unexpected error occurred",
      error,
    });
  }
}
