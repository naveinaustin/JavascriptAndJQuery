package com.training;

import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SSEServlet extends HttpServlet {
	public void doGet(HttpServletRequest request, 
			HttpServletResponse response) throws ServletException, IOException {
		
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		response.setContentType("text/event-stream");
		response.getWriter().write("data: " + String.valueOf(new Date()));
	}
}
