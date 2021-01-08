package com.isu.reservation.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

// The Entity Reservation
// Validations were made using annotations.

@Entity
@Table(name = "reservation")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Lob
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "date")
    private Timestamp date;

    @Column(name = "favorite", columnDefinition = "BOOLEAN")
    private Boolean favorite;

    @Column(name = "stars")
    @Min(value = 0, message = "Stars cannot be smaller than 0")
    @Max(value = 5, message = "Stars cannot be greater than 5")
    private Float stars;

    // Here the ForeignKey of the Contact who owns the reservation.
    @ManyToOne()
    @JoinColumn(name = "contact_id", referencedColumnName = "id")
    @NotNull(message = "Contact cannot be null or empty")
    private Contact contact;

    public Long getId() {
        return id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    public Contact getContact() {
        return contact;
    }

    public void setFavorite(Boolean favorite) {
        this.favorite = favorite;
    }

    public Boolean getFavorite() {
        return favorite;
    }

    public void setStars(Float stars) {
        this.stars = stars;
    }

    public Float getStars() {
        return stars;
    }
}
