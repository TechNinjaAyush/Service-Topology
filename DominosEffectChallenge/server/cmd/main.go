package main

import (
	"servicedependency/controllers"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Entrypoint(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "server is running",
	})
}

func main() {

	// mongo, err := db.ConnectToIncidents()

	// if err != nil {
	// 	log.Fatalf("Error in connecting databasev %v", err)
	// }

	// h := controllers.NewHandler(mongo)

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"https://service-topology-jcav.vercel.app", "http://localhost:3000", "http://localhost:5173"}, // Added local dev ports
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Cache-Control"}, // ✅ Added more headers
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	//  connecting to database

	r.GET("/", Entrypoint)
	r.GET("/service", controllers.JsonMarshalling)

	r.Run()

}
