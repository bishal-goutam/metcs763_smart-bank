package com.banking.smart_bank.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private CustomerAccount account;

    private LocalDateTime transactionDate;
    private String description;
    private double amount;

    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;

    private double balanceBefore;
    private double balanceAfter;

    @SuppressFBWarnings(
            value = "EI_EXPOSE_REP",
            justification = "JPA Entity.Exposing references is required by design."
    )
    public Transaction(CustomerAccount account, LocalDateTime transactionDate, String description, double amount, TransactionType transactionType, double balanceBefore, double balanceAfter) {
        this.account = account;
        this.transactionDate = transactionDate;
        this.description = description;
        this.amount = amount;
        this.transactionType = transactionType;
        this.balanceBefore = balanceBefore;
        this.balanceAfter = balanceAfter;
    }
}
