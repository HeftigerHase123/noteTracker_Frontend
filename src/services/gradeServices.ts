"use server";

import { GradesAPI } from "@/lib/api/Grades";
import { verifySession } from "@/lib/session";
import { Grade } from "@/types/Grade";

export async function updateGrade(comment: string, grade: Grade) {
  const session = await verifySession();
  if (!session) return;

  if (comment.length > 255) {
    return {
      message: "Comment is to long. Only 255 characters are allowed"
    };
  }

  try{
    const body = {
      comment: comment
    }
    await GradesAPI.update(grade.id, body, session.accessToken);
  } catch (error) {
    return {
      message: "A problem occured while saving your comment"
    }
  }
}